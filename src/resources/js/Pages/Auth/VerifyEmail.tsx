import PrimaryButton from "@/Components/shared/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="メール認証" />

            <div className="mb-4 text-sm text-gray-600">
                ご登録ありがとうございます！始める前に、送信したメールのリンクを
                クリックしてメールアドレスを認証してください。届いていない場合は、 再送できます。
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    登録時に入力したメールアドレスに、新しい認証リンクを送信しました。
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>認証メールを再送する</PrimaryButton>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ログアウト
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
