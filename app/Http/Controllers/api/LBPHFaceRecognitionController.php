<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Psy\CodeCleaner\NoReturnValue;
use Validator;

class LBPHFaceRecognitionController extends Controller
{
    /**
     * @OA\Post(
     *     path="/lbph_face_recognition/train",
     *     operationId="trainLBPHFaceRecognition",
     *     tags={"Face Recognition"},
     *     summary="Train LBPH Face Recognition",
     *     description="Train the LBPH Face Recognition model with an image.",
     *     @OA\RequestBody(
     *         required=true,
     *         description="Image data as form-data",
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="image",
     *                     description="Image file (PNG format, less than 2048KB)",
     *                     type="file",
     *                 ),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success response",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Image trained"
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Failed response - Validator failed from Laravel",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Validator failed from Laravel"
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Exception occurred",
     *     ),
     * )
     */
    public function train(Request $request)
    {
        try {
            $payload = Validator::make($request->all(), [
                'image' => 'required|mimes:png|max:2048'
            ]);

            if ($payload->failed()) {
                return response([
                    'error' => $payload->getMessageBag()
                ], 400);
            }

            return response([
                'message' => 'image trained'
            ], 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e
            ], 500);
        }
    }
}