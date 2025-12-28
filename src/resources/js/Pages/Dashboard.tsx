import Card from "@/Components/shared/Card";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import SecondaryButton from "@/Components/shared/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { z } from "zod";
import { formatDate } from "@/utils/date";
import { postSchema, userSchema, type PageProps } from "@/types";

type DashboardPageProps = PageProps<{
  stats?: unknown;
  recentPosts?: unknown;
}>;

const statsSchema = z
  .object({
    totalPosts: z.number().nonnegative(),
    publishedPosts: z.number().nonnegative(),
    draftPosts: z.number().nonnegative(),
  })
  .partial()
  .catch({});

const recentPostSchema = postSchema.pick({
  id: true,
  title: true,
  status: true,
  created_at: true,
  user: true,
});

const dashboardSchema = z.object({
  stats: statsSchema,
  recentPosts: z.array(recentPostSchema).catch([]),
});

export default function Dashboard() {
  const { props } = usePage<DashboardPageProps>();
  const user = userSchema.parse(props.auth.user);
  const { stats, recentPosts } = dashboardSchema.parse({
    stats: props.stats,
    recentPosts: props.recentPosts,
  });

  const resolvedStats = {
    totalPosts: stats.totalPosts ?? 0,
    publishedPosts: stats.publishedPosts ?? 0,
    draftPosts: stats.draftPosts ?? 0,
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Overview</p>
            <h2 className="text-xl font-semibold leading-tight text-gray-800">ダッシュボード</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href={route("posts.create")}>
              <PrimaryButton>記事を書く</PrimaryButton>
            </Link>
            <Link href={route("posts.index")}>
              <SecondaryButton>記事一覧へ</SecondaryButton>
            </Link>
          </div>
        </div>
      }
    >
      <Head title="ダッシュボード" />

      <div className="py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:px-6 lg:px-8">
          <Card className="border border-gray-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">こんにちは、{user.name}さん</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  記事の状況をまとめて確認できます。
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  下書きの整理や公開記事の確認を始めましょう。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={route("posts.create")} className="w-full sm:w-auto">
                  <PrimaryButton className="w-full sm:w-auto">新しい記事を作成</PrimaryButton>
                </Link>
                <Link href={route("posts.index")} className="w-full sm:w-auto">
                  <SecondaryButton className="w-full sm:w-auto">記事を管理</SecondaryButton>
                </Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Stats</p>
                <h3 className="text-lg font-semibold text-gray-900">記事のサマリー</h3>
                <p className="text-sm text-gray-500">最新の公開状況を確認できます。</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "総記事数",
                  value: resolvedStats.totalPosts,
                  accent: "bg-indigo-50 text-indigo-700",
                },
                {
                  label: "公開中",
                  value: resolvedStats.publishedPosts,
                  accent: "bg-green-50 text-green-700",
                },
                {
                  label: "下書き",
                  value: resolvedStats.draftPosts,
                  accent: "bg-yellow-50 text-yellow-700",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-4 shadow-sm"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className={`mt-2 text-3xl font-bold ${item.accent}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Recent</p>
                <h3 className="text-lg font-semibold text-gray-900">最近の更新</h3>
                <p className="text-sm text-gray-500">最新の投稿や更新状況をざっと確認できます。</p>
              </div>
              <Link href={route("posts.index")}>
                <SecondaryButton>記事一覧へ</SecondaryButton>
              </Link>
            </div>

            {recentPosts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
                <p className="text-lg font-semibold text-gray-900">最近の更新はまだありません</p>
                <p className="mt-2 text-sm text-gray-600">
                  最初の記事を作成して、ダッシュボードに表示してみましょう。
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link href={route("posts.create")}>
                    <PrimaryButton>記事を書く</PrimaryButton>
                  </Link>
                  <Link href={route("posts.index")}>
                    <SecondaryButton>記事一覧を見る</SecondaryButton>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentPosts.map((post) => (
                  <div key={post.id} className="py-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={route("posts.show", post.id)}
                            className="text-base font-semibold text-gray-900 hover:text-indigo-600"
                          >
                            {post.title}
                          </Link>
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status === "published" ? "公開" : "下書き"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(post.created_at)} ・ {post.user.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={route("posts.show", post.id)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          詳細
                        </Link>
                        <Link
                          href={route("posts.edit", post.id)}
                          className="text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                          編集
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
