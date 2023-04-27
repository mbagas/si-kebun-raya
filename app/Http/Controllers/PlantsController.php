<?php

namespace App\Http\Controllers;

use App\Models\Plants;
use App\Models\Species;
use Illuminate\Http\Request;

class PlantsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    
    $request->validate([
      'accessNumber' => 'required|string|max:255',
      'speciesId' => 'required',
      'coordinate'=> 'required|string',
      'status' => 'required|string',
    ]);

    if(is_file($request->image)) {
      $fileName = $request->speciesId . '_' . $request->accessNumber . '.' . $request->image->extension();
      $request->image->move(public_path('plantPhoto'), $fileName);

      $plant = Plants::create([
        'access_number' => $request->accessNumber,
        'species_id' => $request->speciesId,
        'coordinate' => $request->coordinate,
        'status' => $request->status,
        'image' => $fileName,
        'planter' => $request->planter,
      ]);
    } else {
      $plant = Plants::create([
        'access_number' => $request->accessNumber,
        'species_id' => $request->speciesId,
        'coordinate' => $request->coordinate,
        'status' => $request->status,
        'planter' => $request->planter,
      ]);
    }
    if($plant->species_id) {
      $species = Species::find($plant->species_id);
      $species->update([
        'amount_in_nurseries' => $species->amount_in_nurseries-1,
        'amount_in_field' => $species->amount_in_field+1,
      ]);
    }

    return back();
    
  }

  /**
   * Display the specified resource.
   */
  public function show(Plants $plants)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Plants $plants)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Plants $plant)
  {
    //
    $request->validate([
      'accessNumber' => 'required|string|max:255',
      'speciesId' => 'required',
      'coordinate' => 'required|string',
      'status' => 'required|string',
    ]);
    


    if (is_file($request->image)) {
      if($plant->image[1] != null) {
        if (file_exists(public_path('plantPhoto/' . $plant->image[1]))) {
          unlink(public_path('plantPhoto/' . $plant->image[1]));
        }
      }
      
      $fileName = $request->accessNumber . '_' . $request->coordinate . '.' . $request->image->extension();
      $request->image->move(public_path('plantPhoto'), $fileName);

      $plant->update([
        'access_number' => $request->accessNumber,
        'species_id' => $request->speciesId,
        'coordinate' => $request->coordinate,
        'status' => $request->status,
        'image' => $fileName,
        'planter' => $request->planter,
      ]);
    } else {
      $plant ->update([
        'access_number' => $request->accessNumber,
        'species_id' => $request->speciesId,
        'coordinate' => $request->coordinate,
        'status' => $request->status,
        'planter' => $request->planter,
      ]);
    }
    

    return back();
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Plants $plant)
  {
    //
    if ($plant->image[1] != null) {
      if (file_exists(public_path('plantPhoto/' . $plant->image[1]))) {
        unlink(public_path('plantPhoto/' . $plant->image[1]));
      }
    }
    $plant->delete();
    return back();
  }
}
