<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $posts = Post::with('user')->orderBy('created_at', 'desc')->get();
    return Inertia::render('Posts/Index', [
      'posts' => PostResource::collection($posts)->resolve(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Posts/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePostRequest $request)
  {
    $validated = $request->validated();

    $post = Post::create([
      'title' => $validated['title'],
      'content' => $validated['content'],
      'excerpt' => $validated['excerpt'],
      'status' => $validated['status'],
      'user_id' => auth()->id(),
      'published_at' => $validated['status'] === 'published' ? now() : null,
    ]);

    return redirect()->route('posts.index')->with('success', '記事が作成されました。');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $post = Post::with('user')->findOrFail($id);
    return Inertia::render('Posts/Show', [
      'post' => PostResource::make($post)->resolve(),
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    $post = Post::with('user')->findOrFail($id);
    return Inertia::render('Posts/Edit', [
      'post' => PostResource::make($post)->resolve(),
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePostRequest $request, string $id)
  {
    $post = Post::findOrFail($id);

    $validated = $request->validated();

    $post->update([
      'title' => $validated['title'],
      'content' => $validated['content'],
      'excerpt' => $validated['excerpt'],
      'status' => $validated['status'],
      'published_at' => $validated['status'] === 'published' ? $post->published_at ?? now() : null,
    ]);

    return redirect()->route('posts.index')->with('success', '記事が更新されました。');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $post = Post::findOrFail($id);
    $post->delete();

    return redirect()->route('posts.index')->with('success', '記事が削除されました。');
  }
}
