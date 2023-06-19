<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;


class DataRequests extends Model
{
    use HasFactory;
  use Notifiable;

  protected $fillable = [
    'name',
    'institute',
    'email',
    'reason',
    'document',
    'family_id',
    'species_id',
    'status',
    'token',
    'decline_reason',
    'type'
  ];

  protected function document(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => [url('dataRequestDocument/' . $value), $value],
    );
  }

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
    return $this->BelongsToMany(Species::class, 'data_requests_species','data_request_id', 'species_id');
  }
}
