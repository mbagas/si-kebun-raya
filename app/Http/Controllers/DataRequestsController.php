<?php

namespace App\Http\Controllers;

use App\Models\DataRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Species;
use App\Models\Families;

class DataRequestsController extends Controller
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
    $species = Species::with('famili')->get();
    $families = Families::all();
    return Inertia::render('Guest/AddDataRequest', [
      'species' => $species,
      'families' => $families
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|max:255',
      'institute' => 'required|string|max:255',
      'familyId' => 'integer|max:255',
      'reason' => 'required|string',
      'filterBy' => 'required|string',
    ]);

    if ($request->filterBy == 'famili') {
      $dataRequest = DataRequests::create([
        'name' => $request->name,
        'email' => $request->email,
        'institute' => $request->institute,
        'family_id' => $request->familyId,
        'reason' => $request->reason,
        'status' => 'pending'
      ]);
    } else if ($request->filterBy == 'species') {
      $dataRequest = DataRequests::create([
        'name' => $request->name,
        'email' => $request->email,
        'institute' => $request->institute,
        'species_id' => $request->speciesId,
        'reason' => $request->reason,
        'status' => 'pending'
      ]);
    }

    return to_route('data-request.create')->with('message', 'Data Request Successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(DataRequests $dataRequests)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(DataRequests $dataRequests)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, DataRequests $dataRequests)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(DataRequests $dataRequests)
  {
    //
  }
}
