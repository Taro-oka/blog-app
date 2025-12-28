<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
  Route::resource('posts', PostController::class);
  Route::get('/', function () {
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
  })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
