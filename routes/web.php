<?php

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
Route::inertia('/v1', 'Dashboard');
Route::inertia('/v1/users', 'Members');

Route::get('/', [App\Http\Controllers\v2\DashboardController::class, 'index']);
Route::get('/new-face', [App\Http\Controllers\v2\DashboardController::class, 'newFace']);

Route::get('/lbph/score/{filename}', [App\Http\Controllers\api\LBPHFaceRecognitionController::class, 'imagePredicted']);
Route::get('/lbph/logs', [App\Http\Controllers\api\LBPHFaceRecognitionController::class, 'predictedLogs']);

Route::get('/users', [App\Http\Controllers\v2\UserController::class, 'index']);
Route::get('/users/trained-image/{filename}', [App\Http\Controllers\v2\UserController::class, 'trainedImage']);


// require __DIR__.'/auth.php';
