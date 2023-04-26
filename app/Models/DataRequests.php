<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataRequests extends Model
{
    use HasFactory;

  protected $fillable = [
    'name',
    'institute',
    'email',
    'reason',
    'family_id',
    'species_id',
    'status',
    'token',
  ];

  public function famili(): BelongsTo
  {
    return $this->BelongsTo(Families::class, 'family_id');
  }

  // public function species(): BelongsTo
  // {
  //   return $this->BelongsTo(Species::class, 'species_id');
  // }
  public function species(): BelongsToMany
  {
    return $this->BelongsToMany(Species::class, 'species_id');
  }
}
