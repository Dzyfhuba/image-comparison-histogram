<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function() {
    return response()->json([
        'hello' => 'world'
    ]);
});

Route::resource('/members', \App\Http\Controllers\MemberController::class);
Route::get('/members/{id}/kyc_image', [\App\Http\Controllers\MemberController::class, 'kyc_image']);