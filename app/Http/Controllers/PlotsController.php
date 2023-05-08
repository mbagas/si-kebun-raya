<?php

namespace App\Http\Controllers;

use App\Models\Plots;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class PlotsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
    $plots = Plots::all();
    return Inertia::render('Plot/Plot', [
      'plots' => $plots
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    return Inertia::render('Plot/AddPlot');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',
      'childName' => 'required|string|max:255',
    ]);

    $plot = Plots::create([
      'name' => $request->name,
      'child_name' => $request->childName,
      'latitude' => $request->latitude,
      'longitude' => $request->longitude,
    ]);
    return to_route('plots.index')->with('message', 'Plot has been created successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(Plots $plot)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Plots $plot)
  {
    //
    return Inertia::render('Plot/EditPlot', [
      'plot' => $plot,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Plots $plot)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',
      'childName' => 'required|string|max:255',
    ]);
    $plot->update([
      'name' => $request->name,
      'child_name' => $request->childName,
      'latitude' => $request->latitude,
      'longitude' => $request->longitude,
    ]);

    return to_route('plots.index')->with('message', 'Updated Successfully');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Plots $plot)
  {
    //
    // dd($plot);
    $plot->delete();
    return to_route('plots.index')->with('message', 'Deleted Successfully');
  }
}
