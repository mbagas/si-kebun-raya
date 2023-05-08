<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FamiliesController;
use App\Http\Controllers\SpeciesController;
use App\Http\Controllers\PlotsController;
use App\Http\Controllers\PlantsController;
use App\Http\Controllers\BukuKebunController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\DataRequestsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [GuestController::class, 'index'])->name('guest');
Route::get('/data-request/getdata', [GuestController::class, 'filterByToken'])->name('dataFilteredByToken');
Route::resource('data-request', DataRequestsController::class)->only(['create', 'store']);

Route::middleware('auth')->group(function () {
    Route::resource('user', UsersController::class);
    Route::resource('families', FamiliesController::class);
    Route::resource('plots', PlotsController::class);
    
    Route::resource('species', SpeciesController::class)->only(['create']);
    Route::resource('species', SpeciesController::class)->except(['show']);
    
    Route::resource('plants', PlantsController::class);

    Route::resource('data-request', DataRequestsController::class)->except(['create','store']);

    Route::get('/buku-kebun', [BukuKebunController::class, 'index'])->name('buku_kebun');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::resource('species', SpeciesController::class)->only(['show']);

require __DIR__.'/auth.php';
