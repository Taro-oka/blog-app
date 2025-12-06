import React, { useState } from "react";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import SecondaryButton from "@/Components/shared/SecondaryButton";
import DangerButton from "@/Components/shared/DangerButton";
import InputLabel from "@/Components/shared/InputLabel";
import TextInput from "@/Components/shared/TextInput";
import InputError from "@/Components/shared/InputError";
import Modal from "@/Components/shared/Modal";
import Card from "@/Components/shared/Card";
import { postSchema, userSchema, type PostForm, type PageProps } from "@/types";

type EditPageProps = PageProps<{ post: unknown }>;

export default function Edit() {
  const { props } = usePage<EditPageProps>();
  userSchema.parse(props.auth.user);
  const post = postSchema.parse(props.post);

  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const { data, setData, patch, processing, errors } = useForm<PostForm>({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    status: post.status,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("posts.update", post.id));
  };

  const deletePost = () => {
    router.delete(route("posts.destroy", post.id), {
      onSuccess: () => {
        setConfirmingDeletion(false);
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">記事を編集</h2>}
    >
      <Head title={`編集: ${post.title}`} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <form onSubmit={submit} className="space-y-6">
              <div>
                <InputLabel htmlFor="title" value="タイトル" />
                <TextInput
                  id="title"
                  type="text"
                  name="title"
                  value={data.title}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("title", e.target.value)}
                  required
                />
                <InputError message={errors.title} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="excerpt" value="概要（任意）" />
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={data.excerpt ?? ""}
                  className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                  rows={3}
                  onChange={(e) => setData("excerpt", e.target.value)}
                  placeholder="記事の概要を入力してください..."
                />
                <InputError message={errors.excerpt} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="content" value="本文" />
                <textarea
                  id="content"
                  name="content"
                  value={data.content}
                  className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                  rows={15}
                  onChange={(e) => setData("content", e.target.value)}
                  required
                  placeholder="記事の内容を入力してください..."
                />
                <InputError message={errors.content} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="status" value="公開設定" />
                <select
                  id="status"
                  name="status"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value as PostForm["status"])}
                  className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                >
                  <option value="draft">下書き</option>
                  <option value="published">公開</option>
                </select>
                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <SecondaryButton type="button" onClick={() => window.history.back()}>
                    キャンセル
                  </SecondaryButton>

                  <DangerButton type="button" onClick={() => setConfirmingDeletion(true)}>
                    削除
                  </DangerButton>
                </div>

                <PrimaryButton className="w-full sm:w-auto" disabled={processing}>
                  {processing ? "更新中..." : "更新"}
                </PrimaryButton>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Modal show={confirmingDeletion} onClose={() => setConfirmingDeletion(false)}>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">記事を削除しますか？</h2>

          <p className="mt-1 text-sm text-gray-600">
            「{post.title}
            」を削除します。この操作は取り消すことができません。
          </p>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={() => setConfirmingDeletion(false)}>
              キャンセル
            </SecondaryButton>

            <DangerButton className="ms-3" onClick={deletePost}>
              削除
            </DangerButton>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
