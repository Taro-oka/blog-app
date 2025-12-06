<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
  protected $fillable = ['title', 'content', 'excerpt', 'status', 'user_id', 'published_at'];

  protected $casts = [
    'published_at' => 'datetime',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
