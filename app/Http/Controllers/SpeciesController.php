<?php

namespace App\Http\Controllers;

use App\Models\Species;
use App\Models\Families;
use App\Models\Plots;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
class SpeciesController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
    $species = Species::with('famili', 'plot')->get();
    // $species->famili_name = $species->famili->name;
    // $species->plot_name = $species->plot->name;
    // dd($species);
    return Inertia::render('Species/Species', [
      'species' => $species,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    $families = Families::all();
    $plots = Plots::all();
    return Inertia::render('Species/AddSpecies', [
      'families' => $families,
      'plots' => $plots,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'collectionNumber' => 'required|string|max:255',
      'accessNumber' => 'required|string|max:255',
      'collectorNumber' => 'required|string|max:255',
      'name' => 'string|max:255',
      'localName' => 'string|max:255',
      'familyId' => 'required',
      'plotId' => 'required',
      'plantingDate' => 'required',
      'planter' => 'required|string|max:255',
      'collectionOrigin' => 'required|string|max:255',
      'amountInNurseries' => 'required|integer',
      'amountInField' => 'required|integer',
      'total' => 'required|integer',
      'plantingCoordinate' => 'string',
      'description' => 'string',
      'benefit' => 'string',
    ]);

    $typeExist = $request->name ? 1 : 0;
    $spExist = $request->name ? 0 : 1;

    $user = Auth::user();

    if (is_file($request->image)) {
      $fileName = $request->accessNumber . '_' . $request->name . '.' . $request->image->extension();
      $request->image->move(public_path('speciesPhoto'), $fileName);

      $species = Species::create([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
        'planter' => $request->planter,
        'collection_origin' => $request->collectionOrigin,
        'amount_in_nurseries' => $request->amountInNurseries,
        'amount_in_field' => $request->amountInField,
        'total' => $request->total,
        'genus_exist' => 1,
        'type_exist' => $typeExist,
        'sp_exist' => $spExist,
        'planting_coordinate' => $request->plantingCoordinate,
        'image' => $fileName,
        'description' => $request->description,
        'benefit' => $request->benefit,
        'user_id' => $user->id,
      ]);
    } else {
      $species = Species::create([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
        'planter' => $request->planter,
        'collection_origin' => $request->collectionOrigin,
        'amount_in_nurseries' => $request->amountInNurseries,
        'amount_in_field' => $request->amountInField,
        'total' => $request->total,
        'genus_exist' => 1,
        'type_exist' => $typeExist,
        'sp_exist' => $spExist,
        'planting_coordinate' => $request->plantingCoordinate,
        'description' => $request->description,
        'benefit' => $request->benefit,
        'user_id' => $user->id,
      ]);
    }
    

    

    return to_route('species.index')->with('message', 'Species has been created successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(Species $species)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Species $species)
  {
    //
    $families = Families::all();
    $plots = Plots::all();
    return Inertia::render('Species/EditSpecies', [
      'species' => $species,
      'families' => $families,
      'plots' => $plots,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Species $species)
  {
    //
    $request->validate([
      'collectionNumber' => 'required|string|max:255',
      'accessNumber' => 'required|string|max:255',
      'collectorNumber' => 'required|string|max:255',
      'name' => 'string|max:255',
      'localName' => 'string|max:255',
      'familyId' => 'required',
      'plotId' => 'required',
      'plantingDate' => 'required',
      'planter' => 'required|string|max:255',
      'collectionOrigin' => 'required|string|max:255',
      'amountInNurseries' => 'required|integer',
      'amountInField' => 'required|integer',
      'total' => 'required|integer',
      'plantingCoordinate' => 'string',
      'description' => 'string',
      'benefit' => 'string',
    ]);

    $typeExist = $request->name ? 1 : 0;
    $spExist = $request->name ? 0 : 1;

    $user = Auth::user();

    if (is_file($request->image)) {
      if (file_exists(public_path('speciesPhoto/'. $species->image[1]))) {
        unlink(public_path('speciesPhoto/' . $species->image[1]));
      }
      $fileName = $request->accessNumber . '_' . $request->name . '.' . $request->image->extension();
      $request->image->move(public_path('speciesPhoto'), $fileName);
      $species->update([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
        'planter' => $request->planter,
        'collection_origin' => $request->collectionOrigin,
        'amount_in_nurseries' => $request->amountInNurseries,
        'amount_in_field' => $request->amountInField,
        'total' => $request->total,
        'image' => $fileName,
        'genus_exist' => 1,
        'type_exist' => $typeExist,
        'sp_exist' => $spExist,
        'planting_coordinate' => $request->plantingCoordinate,
        'description' => $request->description,
        'benefit' => $request->benefit,
        'user_id' => $user->id,
      ]);
    } else {
      $species->update([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
        'planter' => $request->planter,
        'collection_origin' => $request->collectionOrigin,
        'amount_in_nurseries' => $request->amountInNurseries,
        'amount_in_field' => $request->amountInField,
        'total' => $request->total,
        'genus_exist' => 1,
        'type_exist' => $typeExist,
        'sp_exist' => $spExist,
        'planting_coordinate' => $request->plantingCoordinate,
        'description' => $request->description,
        'benefit' => $request->benefit,
        'user_id' => $user->id,
      ]);
    }



    return to_route('species.index')->with('message', 'Update Successfully');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Species $species)
  {
    //
    if (file_exists(public_path('speciesPhoto/' . $species->image[1]))) {
      unlink(public_path('speciesPhoto/' . $species->image[1]));
    }
    $species->delete();
    return to_route('families.index')->with('message', 'Delete Successfully');
  }
}
