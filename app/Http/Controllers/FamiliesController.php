<?php

namespace App\Http\Controllers;

use App\Models\Families;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(Families $families)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Families $families)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Families $families)
    {
        //
    }
}
