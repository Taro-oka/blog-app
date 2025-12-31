<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  public function __invoke(): Response
  {
    $stats = [
      'totalPosts' => Post::count(),
      'publishedPosts' => Post::where('status', 'published')->count(),
      'draftPosts' => Post::where('status', 'draft')->count(),
    ];

    $recentPosts = PostResource::collection(
      Post::with('user')->latest('created_at')->take(5)->get(),
    )->resolve();

    return Inertia::render('Dashboard', [
      'stats' => $stats,
      'recentPosts' => $recentPosts,
    ]);
  }
}
