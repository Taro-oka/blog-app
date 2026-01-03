# Admin role implementation plan

## 現状

- usersテーブルにロール列なし（id/name/email/password/timestampsのみ）。
- ルーティングは`bootstrap/app.php`でweb/consoleのみ有効。APIルート未設定。
- Inertia共有の`UserResource`やTSの`userSchema`にロール情報なし。
- 投稿一覧は`PostController@index`で全投稿取得。所有者/ロールチェックなし。

## 方針概要

- usersテーブルに`role`（enum: user/admin、default user）を追加し、既存データを`user`で移行する。
- admin登録専用APIを用意し、リクエストヘッダーのパスキーで保護する。
- admin専用ログインページを追加し、admin以外は拒否するフローを実装する。
- バックエンドでadminチェック用ミドルウェア/ポリシーを用意し、adminのみ実行可能な処理を保護する。
- Inertia/TS側で`role`を共有し、UIでもadmin機能の表示/非表示を制御する。

## DB・モデル変更

- マイグレーション: usersに`role`(string/enum, length<=20)を追加。default `user`、インデックス付与。必要なら`is_admin`アクセサを追加。
- モデル: `User::$fillable`に`role`を追加。`UserResource`で`role`を返却し、`HandleInertiaRequests`共有データ経由でフロントへ渡す。
- Factory/Seeder: `UserFactory`に`state(['role' => 'admin'])`などを追加。既存ユーザーは移行時に`role=user`で埋める。

## Admin登録API（パスキー必須）

- `bootstrap/app.php`の`withRouting`に`api: __DIR__.'/../routes/api.php'`を追加してAPIルートを有効化する。
- ルート: `routes/api.php`を作成し`Route::post('/admin/users', ...)`を定義。`throttle:10,1`などのレート制限を付与。
- パスキー: `.env`に`ADMIN_REGISTRATION_KEY=...`を追加。`X-Admin-Registration-Key`ヘッダー(または`admin_passkey`クエリ)を確認するミドルウェア`EnsureAdminRegistrationKey`を作成し、このAPIに適用。
- コントローラ: `Admin\RegisterAdminUserController@store`などで`name/email/password`をバリデートし、`role='admin'`でユーザー作成。レスポンスはJSON（作成ユーザー情報とメッセージ）。
- cURL例:
  - `curl -X POST https://your.app/api/admin/users -H "X-Admin-Registration-Key: <passkey>" -d "name=Admin" -d "email=admin@example.com" -d "password=secret" -d "password_confirmation=secret"`

## Adminログイン（フロント含む）

- ルート: `Route::get('/admin/login')`, `Route::post('/admin/login')`をguest向けに追加。ログイン成功後に`role!=='admin'`なら即時ログアウト＋エラー返却。
- ミドルウェア: `EnsureUserIsAdmin`を作成し、管理画面ルート`Route::middleware(['auth','verified','admin'])->group(...);`で使用。
- コントローラ: `Admin\AuthenticatedSessionController`で認証処理をラップ。セッション/remember meの扱いは通常ログインと同じ。
- フロント: `resources/js/Pages/Admin/Login.tsx`を追加し、admin専用のコピー/バリデーションを表示。ログイン後は`/admin`ダッシュボード等へリダイレクト。

## Adminチェックと権限

- ミドルウェア: `EnsureUserIsAdmin`で`auth()->user()->role === 'admin'`を確認。401/403レスポンス。
- Gate/Policy: `AuthServiceProvider`で`Gate::define('admin-only', fn(User $u)=>$u->role==='admin');`を定義。投稿関連ポリシーでadminは全許可にする。
- コントローラ適用例:
  - 全投稿の一括取得やステータス変更APIは`->middleware('admin')`または`Gate::authorize('admin-only')`で保護。
  - 既存`PostController@index`は一般ユーザー用に`where('user_id', auth()->id())`へ絞るか、管理用の別`AdminPostController@index`を用意して区別する。

## フロントエンド反映

- TS型: `userSchema`に`role: z.enum(['user','admin'])`を追加し、`isAdmin`などの派生フラグを持たせる。
- Inertia共有: `auth.user`に`role`を含める。型安全のため`PageProps`を更新。
- UI: adminユーザーにのみ管理ナビ/リンクを表示。一般ユーザーには非表示。admin専用ページは`admin`ミドルウェア付きルートから取得。
- エラーハンドリング: adminログイン失敗時のメッセージ（非admin/パスワード違い）を分け、過度に情報を漏らさない。

## セキュリティと運用

- `.env`の`ADMIN_REGISTRATION_KEY`を秘密管理し、必要に応じて定期ローテーション。キー漏洩時は即時変更＋ログ監査。
- Admin登録APIにレート制限/ログ記録（成功・失敗）を追加。TLS前提。
- Adminログインにも`throttle`適用。CSRFはwebルートで自動付与。
- 監査: adminの作成・ログイン・重要操作にイベント/ログを残す。

## テスト

- Feature: パスキーありでadmin作成成功、キー不正で403、必須項目欠如で422。
- Feature: adminログイン成功、非adminは拒否される、adminミドルウェアが403を返す。
- Policy: adminが投稿閲覧/編集を許可されること、一般ユーザーは自分の投稿のみ許可されること。
- JS/ビルド: `userSchema`変更後に型エラーが出ないことを確認し、adminログインページのUIスナップショット/動作確認。

## 導入手順メモ

1. マイグレーション追加＆実行。
2. `.env`に`ADMIN_REGISTRATION_KEY`設定。
3. API経由で初回admin作成（cURL/Postman）。
4. adminログインページ経由でサインイン確認。
5. adminミドルウェア付きルート/機能の動作を確認。
