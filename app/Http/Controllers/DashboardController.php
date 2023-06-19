<?php

namespace App\Http\Controllers;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DataRequests;
use App\Models\Species;
use App\Models\Plants;
use App\Models\Families;
use App\Models\Plots;


class DashboardController extends Controller
{
  //
  public function index()
  {
    //
    $speciesByOrigin = Species::select('collection_origin', DB::raw('count(*) as total'))
      ->groupBy('collection_origin')
      ->get();
    // dd($speciesByOrigin);
    $speciesByWayCollect = Species::select('way_to_collect', DB::raw('count(*) as total'))
      ->groupBy('way_to_collect')
      ->get();

    $speciesByTime = Species::select( DB::raw('YEAR(planting_date) as year'),DB::raw('MONTH(planting_date) as month'), DB::raw('count(*) as total') )
      ->groupBy(DB::raw('YEAR(planting_date)'), DB::raw('MONTH(planting_date)'))
      ->get();

      // need to update this to planting_date
    $plantsByTime = Plants::select( DB::raw('YEAR(planting_date) as year'),DB::raw('MONTH(planting_date) as month'), DB::raw('count(*) as total') )
      ->groupBy(DB::raw('YEAR(planting_date)'), DB::raw('MONTH(planting_date)'))
      ->get(); 

    $totalFamili = Families::count();
    $totalGenus = Species::select('genus')->distinct()->count();
    $totalSpecies = Species::count();
    $totalSpecimens = Plants::count();
    $totalDataRequests = DataRequests::count();


    return Inertia::render('Dashboard', [
      'speciesByOrigin' => $speciesByOrigin,
      'speciesByWayCollect' => $speciesByWayCollect,
      'speciesByTime' => $speciesByTime,
      'plantsByTime' => $plantsByTime,
      'totalFamili' => $totalFamili,
      'totalGenus' => $totalGenus,
      'totalSpecies' => $totalSpecies,
      'totalSpecimens' => $totalSpecimens,
      'totalDataRequests' => $totalDataRequests,
    ]);
  }
}
