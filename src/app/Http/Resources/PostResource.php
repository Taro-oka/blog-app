<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Post */
class PostResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'content' => $this->content,
      'excerpt' => $this->excerpt,
      'status' => $this->status,
      'user_id' => (string) $this->user_id,
      'created_at' => $this->created_at?->toISOString(),
      'updated_at' => $this->updated_at?->toISOString(),
      'published_at' => $this->published_at?->toISOString(),
      'user' => UserResource::make($this->whenLoaded('user', $this->user))->resolve(),
    ];
  }
}
