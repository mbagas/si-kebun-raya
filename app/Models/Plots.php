<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plots extends Model
{
    use HasFactory;

  protected $fillable = [
    'name',
    'child_name',
    'latitude',
    'longitude',
  ];

  public function species(): HasMany
  {
    return $this->hasMany(Species::class, 'plot_id');
  }
}
