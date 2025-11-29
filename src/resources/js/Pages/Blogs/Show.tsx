import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/shared/SecondaryButton";

interface Blog {
    id: number;
    title: string;
    excerpt: string | null;
    content: string;
    slug: string;
    status: string;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface ShowProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    blog: Blog;
}

export default function Show({ auth, blog }: ShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        ブログ記事詳細
                    </h2>
                    <div className="flex space-x-3">
                        <Link href={route("blogs.index")}>
                            <SecondaryButton>一覧に戻る</SecondaryButton>
                        </Link>
                        {auth.user.id === blog.user.id && (
                            <Link href={route("blogs.edit", blog.id)}>
                                <SecondaryButton>編集</SecondaryButton>
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={blog.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <article className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* ヘッダー情報 */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            blog.status === "published"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {blog.status === "published"
                                            ? "公開済み"
                                            : "下書き"}
                                    </span>
                                    <time className="text-sm text-gray-500">
                                        作成日: {formatDate(blog.created_at)}
                                    </time>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {blog.title}
                                </h1>

                                {blog.excerpt && (
                                    <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                )}

                                <div className="flex items-center text-sm text-gray-500">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    投稿者: {blog.user.name}
                                    {blog.published_at && (
                                        <>
                                            <span className="mx-2">•</span>
                                            公開日:{" "}
                                            {formatDate(blog.published_at)}
                                        </>
                                    )}
                                    {blog.updated_at !== blog.created_at && (
                                        <>
                                            <span className="mx-2">•</span>
                                            更新日:{" "}
                                            {formatDate(blog.updated_at)}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* 本文 */}
                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="whitespace-pre-wrap leading-relaxed text-gray-800"
                                    style={{ lineHeight: "1.8" }}
                                >
                                    {blog.content}
                                </div>
                            </div>

                            {/* フッター */}
                            <div className="border-t border-gray-200 pt-6 mt-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="text-sm text-gray-500">
                                        スラッグ:{" "}
                                        <code className="bg-gray-100 px-2 py-1 rounded">
                                            {blog.slug}
                                        </code>
                                    </div>
                                    <div className="flex space-x-3">
                                        <Link href={route("blogs.index")}>
                                            <SecondaryButton>
                                                一覧に戻る
                                            </SecondaryButton>
                                        </Link>
                                        {auth.user.id === blog.user.id && (
                                            <Link
                                                href={route(
                                                    "blogs.edit",
                                                    blog.id
                                                )}
                                            >
                                                <SecondaryButton>
                                                    編集
                                                </SecondaryButton>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
