import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import SecondaryButton from "@/Components/shared/SecondaryButton";
import InputLabel from "@/Components/shared/InputLabel";
import TextInput from "@/Components/shared/TextInput";
import InputError from "@/Components/shared/InputError";
import Card from "@/Components/shared/Card";
import { postStatusSchema, userSchema, type PostForm, type PageProps } from "@/types";

type CreatePageProps = PageProps;

export default function Create() {
  const { props } = usePage<CreatePageProps>();
  const defaultStatus = postStatusSchema.enum.draft;

  const { data, setData, post, processing, errors } = useForm<PostForm>({
    title: "",
    content: "",
    excerpt: null,
    status: defaultStatus,
  });
  userSchema.parse(props.auth.user);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("posts.store"));
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">記事を作成</h2>}
    >
      <Head title="記事を作成" />

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
                <SecondaryButton
                  type="button"
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto"
                >
                  キャンセル
                </SecondaryButton>

                <PrimaryButton className="w-full sm:w-auto" disabled={processing}>
                  {processing ? "保存中..." : "保存"}
                </PrimaryButton>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
