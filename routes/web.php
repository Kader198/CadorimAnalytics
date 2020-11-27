<?php

use App\Http\Controllers\Cadorim_analytics;
use App\Http\Controllers\VentesController;
use App\Http\Controllers\VentesMoyen;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

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

Route::get('*',function(){
    return redirect('/cadorim');
});
Route::get('/cadorim', [Cadorim_analytics::class ,'index']);
Route::get('/commonResults',[Cadorim_analytics::class ,'commonResults']);
Route::get('/api/Transaction', [TransactionController::class, 'index']);
Route::get('/api/Ventes',[VentesController::class, 'index']);
Route::get('/api/VentesMoyen', [VentesMoyen::class, 'index']);

Route::get('/', function () {
    return view('welcome');
});
