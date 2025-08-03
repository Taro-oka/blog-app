import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface CreateProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function Create({ auth }: CreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft' as 'draft' | 'published',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blogs.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ブログ記事を作成</h2>}
        >
            <Head title="ブログ記事を作成" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="excerpt" value="概要（任意）" />
                                    <textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={data.excerpt}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                        rows={3}
                                        onChange={(e) => setData('excerpt', e.target.value)}
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
                                        onChange={(e) => setData('content', e.target.value)}
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
                                        onChange={(e) => setData('status', e.target.value as 'draft' | 'published')}
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

                                    <PrimaryButton 
                                        className="w-full sm:w-auto" 
                                        disabled={processing}
                                    >
                                        {processing ? '保存中...' : '保存'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}