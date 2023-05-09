<?php

namespace App\Http\Controllers;

use App\Models\Families;
use App\Models\DataRequests;
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

  public function filterByToken(Request $request)
  {
    $dataRequest = DataRequests::where('status','Diterima')->where('token', $request->token)->first();
    $diff = $dataRequest->updated_at->diffInDays(now());

    if ($dataRequest && $diff < 30) {
      $species = Species::with('famili')->get();
      $families = Families::all();
      return Inertia::render('Guest/AddDataRequest', [
        'dataRequest' => $dataRequest->load('famili','famili.species', 'famili.species.plot', 'famili.species.famili','species','species.famili','species.plot'),
        'species' => $species,
        'families' => $families,
        'status' => '200'
      ]);
    } else {
      return Inertia::render('Guest/AddDataRequest', [
        'status' => '204'
      ]);
    }
  }
}
