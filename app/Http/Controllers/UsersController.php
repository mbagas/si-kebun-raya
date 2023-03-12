<?php

namespace App\Http\Controllers;

use App\Models\User;
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

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    //
      $users = User::all();
      return Inertia::render('User/User', [
        'users' => $users,
        'status' => session('status'),
      ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('User/AddUser');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    //
      $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:' . User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
      ]);

      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
      ]);

      // return to_route('user.index');
      return redirect()->back()->with('message', 'User has been created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        // dd($user);
        return Inertia::render('User/EditUser', [
          'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request, string $id)
    {
        //
        // dd($request);
        $request->user()->fill($request->validated());

        if($request->user()->isDirty('email'))
        {
          $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('user.index')->with('message','Update Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();
        return to_route('user.index')->with('message', 'User delete succesfuly');
    } 
}
