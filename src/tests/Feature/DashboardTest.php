<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
  use RefreshDatabase;

  public function test_dashboard_returns_stats_and_recent_posts(): void
  {
    $user = User::factory()->create();

    $latest = Post::create([
      'title' => 'Latest post',
      'content' => 'Content',
      'excerpt' => 'Excerpt',
      'status' => 'published',
      'user_id' => $user->id,
      'published_at' => Carbon::now(),
      'created_at' => Carbon::now()->subDay(),
      'updated_at' => Carbon::now()->subDay(),
    ]);

    $older = Post::create([
      'title' => 'Older draft',
      'content' => 'Content',
      'excerpt' => null,
      'status' => 'draft',
      'user_id' => $user->id,
      'published_at' => null,
      'created_at' => Carbon::now()->subDays(2),
      'updated_at' => Carbon::now()->subDays(2),
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response
      ->assertOk()
      ->assertInertia(
        fn(Assert $page) => $page
          ->component('Dashboard')
          ->where('stats.totalPosts', 2)
          ->where('stats.publishedPosts', 1)
          ->where('stats.draftPosts', 1)
          ->has('recentPosts', 2)
          ->where('recentPosts.0.id', $latest->id)
          ->where('recentPosts.0.status', 'published')
          ->where('recentPosts.0.user.id', (string) $user->id)
          ->where('recentPosts.1.id', $older->id),
      );
  }

  public function test_dashboard_requires_authentication(): void
  {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
  }
}
