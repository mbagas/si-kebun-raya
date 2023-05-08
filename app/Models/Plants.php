<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Plants extends Model
{
    use HasFactory;

    protected $fillable = [
      'access_number',
      'species_id',
      'coordinate',
      'status',
      'image',
      'planter',
      'planting_date',
      'inspection_date',
    ];

    public function species(): BelongsTo
    {
      return $this->BelongsTo(Species::class, 'species_id');
    }

  protected function image(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => [url('plantPhoto/' . $value), $value],
    );
  }
}
