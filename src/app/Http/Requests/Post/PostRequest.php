<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'title' => ['required', 'string', 'max:255'],
      'content' => ['required', 'string'],
      'excerpt' => ['nullable', 'string', 'max:500'],
      'status' => ['in:draft,published'],
    ];
  }

  /**
   * Normalize input before validation.
   */
  protected function prepareForValidation(): void
  {
    $this->merge([
      'status' => $this->input('status', 'draft'),
      'excerpt' => blank($this->input('excerpt')) ? null : $this->input('excerpt'),
    ]);
  }
}
