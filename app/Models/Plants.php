<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
    ];

    public function species(): BelongsTo
    {
      return $this->BelongsTo(Species::class, 'species_id');
    }
}
