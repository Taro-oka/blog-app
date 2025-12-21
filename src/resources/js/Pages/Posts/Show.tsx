import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/shared/SecondaryButton";
import Card from "@/Components/shared/Card";
import { postSchema, userSchema, type Post, type PageProps } from "@/types";
import { formatDateTime } from "@/utils/date";

type ShowPageProps = PageProps<{ post: unknown }>;

export default function Show() {
  const { props } = usePage<ShowPageProps>();
  const authUser = userSchema.parse(props.auth.user);
  const post = postSchema.parse(props.post);

  const canEdit = (currentUserId: string, resource: Post) => currentUserId === resource.user.id;

  return (
    <AuthenticatedLayout
      header={
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">記事詳細</h2>
          <div className="flex space-x-3">
            <Link href={route("posts.index")}>
              <SecondaryButton>一覧に戻る</SecondaryButton>
            </Link>
            {canEdit(authUser.id, post) && (
              <Link href={route("posts.edit", post.id)}>
                <SecondaryButton>編集</SecondaryButton>
              </Link>
            )}
          </div>
        </div>
      }
    >
      <Head title={post.title} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <Card as="article">
            {/* ヘッダー情報 */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    post.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.status === "published" ? "公開済み" : "下書き"}
                </span>
                <time className="text-sm text-gray-500">
                  作成日: {formatDateTime(post.created_at)}
                </time>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

              {post.excerpt && (
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
              )}

              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                投稿者: {post.user.name}
                {post.published_at && (
                  <>
                    <span className="mx-2">•</span>
                    公開日: {formatDateTime(post.published_at)}
                  </>
                )}
                {post.updated_at !== post.created_at && (
                  <>
                    <span className="mx-2">•</span>
                    更新日: {formatDateTime(post.updated_at)}
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
                {post.content}
              </div>
            </div>

            {/* フッター */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex space-x-3">
                  <Link href={route("posts.index")}>
                    <SecondaryButton>一覧に戻る</SecondaryButton>
                  </Link>
                  {canEdit(authUser.id, post) && (
                    <Link href={route("posts.edit", post.id)}>
                      <SecondaryButton>編集</SecondaryButton>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
