<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Species extends Model
{
    use HasFactory;

  protected $fillable = [
    'collection_number',
    'access_number',
    'collector_number',
    'name',
    'local_name',
    'family_id',
    'plot_id',
    'planting_date',
    'planter',
    'collection_origin',
    'amount_in_nurseries',
    'amount_in_field',
    'total',
    'genus_exist',
    'type_exist',
    'sp_exist',
    'planting_coordinate',
    'image',
    'description',
    'benefit',
    'way_to_collect',
    'user_id',
    'species_url'
  ];



  protected function image(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => [url('speciesPhoto/' . $value), $value],
    );
  }

  protected function getSpeciesUrlAttribute()
  {
    return url('species/' . $this->id);
  }

  public function famili(): BelongsTo
  {
    return $this->belongsTo(Families::class, 'family_id');
  }

  public function plot(): BelongsTo
  {
    return $this->belongsTo(Plots::class, 'plot_id');
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function plant(): HasMany
  {
    return $this->hasMany(Plants::class, 'species_id');
  }

  
}
