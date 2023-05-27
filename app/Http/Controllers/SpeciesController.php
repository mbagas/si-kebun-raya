<?php

namespace App\Http\Controllers;

use App\Models\Species;
use App\Models\Families;
use App\Models\Plants;
use App\Models\Plots;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;

class SpeciesController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
    $species = Species::with('famili', 'plot')->get();
    $families = Families::all();
    // $species->famili_name = $species->famili->name;
    // $species->plot_name = $species->plot->name;
    // dd($species);
    return Inertia::render('Species/Species', [
      'species' => $species,
      'families' => $families,
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
      'accessNumber' => 'required|string|max:255|unique:species,access_number',
      'collectorNumber' => 'required|string|max:255',
      'name' => 'string|max:255',
      'genus' => 'string|max:255',
      'localName' => 'string|max:255',
      'familyId' => 'required',
      'plotId' => 'required',
      'plantingDate' => 'required',
      'collectionOrigin' => 'required|string|max:255',
      'amountInNurseries' => 'required|integer',
      'amountInField' => 'required|integer',
      'total' => 'required|integer',
      'plantingCoordinate' => 'string',
      'description' => 'string',
      'benefit' => 'string',
      'wayToCollect' => 'string',
    ]);

    $typeExist = $request->name ? 1 : 0;
    $spExist = $request->name ? 0 : 1;

    $user = Auth::user();

    if (is_file($request->image)) {
      $fileName = $request->familyId . '_' . $request->accessNumber . '.' . $request->image->extension();
      $request->image->move(public_path('speciesPhoto'), $fileName);

      $species = Species::create([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'genus' => $request->genus,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
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
        'way_to_collect' => $request->wayToCollect,
        'user_id' => $user->id,
      ]);
    } else {
      $species = Species::create([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'genus' => $request->genus,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
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
        'way_to_collect' => $request->wayToCollect,
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
    // dd($species->speciesUrl);
    if (Auth::check()) {
      return Inertia::render('Species/DetailSpecies', [
        'species' => $species->load('famili', 'plot', 'plant'),
        'speciesUrl' => $species->speciesUrl
      ]);
    } else {

      return Inertia::render('Guest/DetailSpeciesGuest', [
        'species' => $species->load('famili', 'plot'),
      ]);
    }
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
      'genus' => 'string|max:255',
      'localName' => 'string|max:255',
      'familyId' => 'required',
      'plotId' => 'required',
      'plantingDate' => 'required',
      'collectionOrigin' => 'required|string|max:255',
      'amountInNurseries' => 'required|integer',
      'amountInField' => 'required|integer',
      'total' => 'required|integer',
      'plantingCoordinate' => 'string',
      'description' => 'string',
      'benefit' => 'string',
      'wayToCollect' => 'string',
    ]);

    $typeExist = $request->name ? 1 : 0;
    $spExist = $request->name ? 0 : 1;

    $user = Auth::user();

    if (is_file($request->image)) {
      if ($species->image[1] != null) {
        if (file_exists(public_path('speciesPhoto/' . $species->image[1]))) {
          unlink(public_path('speciesPhoto/' . $species->image[1]));
        }
      }

      $fileName = $request->familyId . '_' . $request->accessNumber . '.' . $request->image->extension();
      $request->image->move(public_path('speciesPhoto'), $fileName);
      $species->update([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'genus' => $request->genus,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
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
        'way_to_collect' => $request->wayToCollect,
        'user_id' => $user->id,
      ]);
    } else {
      $species->update([
        'collection_number' => $request->collectionNumber,
        'access_number' => $request->accessNumber,
        'collector_number' => $request->collectorNumber,
        'name' => $request->name,
        'genus' => $request->genus,
        'local_name' => $request->localName,
        'family_id' => $request->familyId,
        'plot_id' => $request->plotId,
        'planting_date' => Carbon::parse($request->plantingDate),
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
        'way_to_collect' => $request->wayToCollect,
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
    if ($species->image[1] != null) {
      if (file_exists(public_path('speciesPhoto/' . $species->image[1]))) {
        unlink(public_path('speciesPhoto/' . $species->image[1]));
      }
    }
    $species->delete();
    return to_route('families.index')->with('message', 'Delete Successfully');
  }

  public function import(Request $request)
  {
    try {
      $request->validate([
        'file' => 'required|mimes:csv,txt',
      ]);
      $families = Families::all();
      $plots = Plots::all();
      $user = Auth::user();

      $csvFile = $request->file('file');

      $file = fopen($csvFile->getPathname(), 'r');

      // Read the header row
      $header = fgetcsv($file, 0, ';');

      // Read the remaining rows
      $rows = [];
      while (($line = fgets($file)) !== false) {
        $row = str_getcsv($line, ';');
        $rows[] = $row;
      }

      fclose($file);

      // Remove the first element as it contains the header string
      // array_shift($rows);
      // dd($rows);
      // Process and save the data to the database
      foreach ($rows as $row) {
        $data = array_combine($header, $row);
        $famili = $families->firstWhere('name', $data['famili']);
        $plot = $plots->where('name', $data['vak'])->where('child_name', $data['anak petak'])->first();

        // Process and save the data to the database
        // For example, you can insert the data into a "plants" table
        $species = new Species([
          'collection_number' => $data['nomor koleksi'],
          'access_number' => $data['nomor akses'],
          'collector_number' => $data['nomor kolektor'],
          'name' => $data['nama spesies'],
          'genus' => $data['genus'],
          'local_name' => $data['nama lokal'],
          'family_id' => $famili->id,
          'plot_id' => $plot->id,
          'planting_date' => Carbon::parse($data['tanggal tanam']),
          'collection_origin' => $data['asal koleksi'],
          'amount_in_nurseries' => $data['jumlah di pembibitan'],
          'amount_in_field' => $data['jumlah di lapangan'],
          'total' => $data['total'],
          'genus_exist' => $data['terdapat genus'],
          'type_exist' => $data['terdapat spesies'],
          'sp_exist' => $data['tidak terdapat spesies'],
          'planting_coordinate' => $data['koordinat tanam'],
          'way_to_collect' => $data['cara mendapatkan'],
          'user_id' => $user->id,

        ]);
        $species->save();
      }

      // Associate the post with the user
      // $species->user()->associate($user);

      // Save the post to the database

      // dd($species);

      return back()->with('message', 'Import Successful');
    } catch (\Exception $e) {
      // Handle any errors that occur during the import process
      return back()->with('error', 'Error Importing CSV');
    }
  }
}
