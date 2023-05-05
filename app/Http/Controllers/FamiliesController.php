<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Families;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class FamiliesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $families = Families::all();
        return Inertia::render('Famili/Famili', [
          'families' => $families,
          'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Famili/AddFamili');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
          'name' => 'required|string|max:255',
        ]);

        $famili = Families::create([
          'name' => $request->name,
        ]);

    return to_route('families.index')->with('message', 'User has been created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Families $families)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
  public function edit(Families $family): Response
  {
    //
    // dd($family);
    return Inertia::render('Famili/EditFamili', [
      'famili' => $family,
    ]);
  }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Families $family)
    {
        //
        // dd($request);
        $family->update([
          'name' => $request->name,
        ]);

        return to_route('families.index')->with('message', 'Update Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Families $family)
    {
        //
        // dd($family);
        $family->delete();
        return to_route('families.index')->with('message', 'Delete Successfully');
    }
}


