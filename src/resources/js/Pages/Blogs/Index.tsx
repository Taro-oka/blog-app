import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

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

interface IndexProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    blogs: Blog[];
}

export default function Index({ auth, blogs }: IndexProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const truncateText = (text: string, length: number = 100) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">ブログ記事一覧</h2>
                    <Link href={route('blogs.create')}>
                        <PrimaryButton>新しい記事を作成</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="ブログ記事一覧" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {blogs.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 mb-4">
                                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">記事がありません</h3>
                                    <p className="text-gray-500 mb-6">最初の記事を作成してみましょう。</p>
                                    <Link href={route('blogs.create')}>
                                        <PrimaryButton>記事を作成</PrimaryButton>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {blogs.map((blog) => (
                                        <div key={blog.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    blog.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {blog.status === 'published' ? '公開' : '下書き'}
                                                </span>
                                                <time className="text-sm text-gray-500">
                                                    {formatDate(blog.created_at)}
                                                </time>
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                <Link 
                                                    href={route('blogs.show', blog.id)}
                                                    className="hover:text-indigo-600 transition-colors"
                                                >
                                                    {blog.title}
                                                </Link>
                                            </h3>

                                            {blog.excerpt && (
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                                    {blog.excerpt}
                                                </p>
                                            )}

                                            {!blog.excerpt && (
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                                    {truncateText(blog.content.replace(/<[^>]*>/g, ''))}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-500">
                                                    投稿者: {blog.user.name}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('blogs.edit', blog.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                                    >
                                                        編集
                                                    </Link>
                                                    <Link
                                                        href={route('blogs.show', blog.id)}
                                                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                                    >
                                                        詳細
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}