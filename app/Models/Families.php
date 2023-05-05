<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Families extends Model
{
  
  protected $fillable = [
    'name',
  ];
  use HasFactory;

  public function species(): HasMany
  {
    return $this->hasMany(Species::class, 'family_id');
  }
}
