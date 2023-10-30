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

Route::get('/', function () {
    $list1 = [
        'a' => 123,
        'b' => 321,
        'c' => 123,
    ];
    $list2 = [
        'a' => 123,
        'd' => 24,
        'c' => 123,
    ];

    $list1_keys = array_keys($list1);
    $list2_keys = array_keys($list2);

    // dd(array_unique(array_merge($list1_keys, $list2_keys))); // do this


    return response()->json([
        'hello' => 'world'
    ]);
});

Route::get('/members', [\App\Http\Controllers\api\MemberController::class, 'index']);
Route::post('/members', [\App\Http\Controllers\api\MemberController::class, 'store']);
Route::get('/members/{id}', [\App\Http\Controllers\api\MemberController::class, 'show']);
Route::put('/members/{id}', [\App\Http\Controllers\api\MemberController::class, 'update']);
Route::delete('/members/{id}', [\App\Http\Controllers\api\MemberController::class, 'destroy']);
Route::get('/members/image/{image}', [\App\Http\Controllers\api\MemberController::class, 'kyc_image']);
Route::post('/members/compare_similarity', [\App\Http\Controllers\api\MemberController::class, 'compare_similarity']);

Route::post('/compare', [\App\Http\Controllers\api\CompareController::class, 'compare']);

// route group with middleware
Route::group(['middleware' => ['recaptcha']], function () {
    Route::post('/lbph/train', [\App\Http\Controllers\api\LBPHFaceRecognitionController::class, 'train']);
    Route::post('/lbph/predict', [\App\Http\Controllers\api\LBPHFaceRecognitionController::class, 'predict']);
});
Route::get('/lbph/test', '\App\Http\Controllers\api\LBPHFaceRecognitionController@test');
Route::get('/lbph/score/{filename}', [App\Http\Controllers\api\LBPHFaceRecognitionController::class, 'imagePredicted']);

Route::get('/lbph/reset', '\App\Http\Controllers\api\LBPHFaceRecognitionController@reset');