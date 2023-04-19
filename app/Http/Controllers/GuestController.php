<?php

namespace App\Http\Controllers;

use App\Models\Families;
use Illuminate\Http\Request;
use App\Models\Species;
use Inertia\Inertia;
use Inertia\Response;

class GuestController extends Controller
{
    //
    public function index()
    {
      $species = Species::with('famili', 'plot')->get();
      $famili = Families::all();
      return Inertia::render('Guest/Landing', [
        'species' => $species,
        'families' => $famili,
      ]);
    }
}
