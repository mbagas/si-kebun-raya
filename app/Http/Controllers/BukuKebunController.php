<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plots;
use Inertia\Inertia;
use Inertia\Response;

class BukuKebunController extends Controller
{
    //
    public function index()
    {
      // $plots = Plots::with('species.plant')->get();
      $plots = Plots::all();
      // dd($plots);
      return Inertia::render('BukuKebun/BukuKebun',[
        'plots' => $plots->load('species','species.plant','species.famili')
      ]);
    }
}
