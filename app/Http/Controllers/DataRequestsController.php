<?php

namespace App\Http\Controllers;

use Illuminate\Notifications\Notification;
use App\Models\DataRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Species;
use App\Models\Families;
use App\Notifications\DataRequestEmail;

class DataRequestsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
    $dataRequest = DataRequests::all();
    return Inertia::render('DataRequest/DataRequest',[
      'dataRequest' => $dataRequest->load('famili','species','species.famili','species.plot'),
    ]);
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

    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|string|max:255',
      'institute' => 'required|string|max:255',
      'familyId' => 'integer|max:255|nullable',
      'reason' => 'required|string',
      'type' => 'required|string',
    ]);

    if ($request->type == 'famili') {
      $dataRequest = DataRequests::create([
        'name' => $request->name,
        'email' => $request->email,
        'institute' => $request->institute,
        'family_id' => $request->familyId,
        'reason' => $request->reason,
        'status' => 'Pending',
        'type' => $request->type,
      ]);
    } else if ($request->type == 'species') {
      $dataRequest = DataRequests::create([
        'name' => $request->name,
        'email' => $request->email,
        'institute' => $request->institute,
        // 'species_id' => json_encode($request->speciesId),
        'reason' => $request->reason,
        'status' => 'Pending',
        'type' => $request->type,
      ]);
      $dataRequest->species()->attach($request->speciesId);
    }

    return to_route('data-request.create')->with('message', 'Data Request Successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(DataRequests $data_request)
  {
    //
    // dd($data_request->load('famili', 'species', 'species.famili', 'species.plot'));
    return Inertia::render('DataRequest/DetailDataRequest', [
      'dataRequest' => $data_request->load('famili','species','species.famili','species.plot'),
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(DataRequests $data_request)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, DataRequests $data_request)
  {

    if($request->status == "Diterima") {

      $get_random_string = md5(microtime());
      $project = [
        'greeting' => 'Hi ' . $request->name . ',',
        'body' => 'Permintaan data tumbuhan anda diterima. Silahkan gunakan kode ini untuk mengunduh data tumbuhan yang anda butuhkan. Peringatan kode ini hanya berlaku 30 hari.',
        'result' => $get_random_string,
        'thanks' => 'Terima Kasih',
        'actionText' => 'Buka Web Kebun Raya ITERA',
        'actionURL' => url('/'),
      ];
      $data_request->notify(new DataRequestEmail($project));
      $data_request->update([
        'status' => $request->status,
        'token' => $get_random_string,
      ]);
    } else if ($request->status == "Ditolak") {
      $project = [
        'greeting' => 'Hi ' . $request->name . ',',
        'body' => 'Mohon maaf permintaan data tumbuhan anda tidak dapat kami terima dengan alasan : ' . $request->declineReason .'.',
        'result' => 'TIDAK DI TERIMA',
        'thanks' => 'Terima Kasih',
        'actionText' => 'Buka Web Kebun Raya ITERA',
        'actionURL' => url('/'),
      ];
      $data_request->notify(new DataRequestEmail($project));
      $data_request->update([
        'status' => $request->status,
        'decline_reason' => $request->declineReason,
        'token' => null,
      ]);
    };
    
    return to_route('data-request.index')->with('message', 'Validation Successfully');

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(DataRequests $dataRequests)
  {
    //
  }

  
}
