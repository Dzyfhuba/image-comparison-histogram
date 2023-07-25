<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Psy\CodeCleaner\NoReturnValue;
use Validator;

use CV\Face\LBPHFaceRecognizer, CV\CascadeClassifier, CV\Scalar, CV\Point;
use function CV\{imread, cvtColor, equalizeHist};
use const CV\{COLOR_BGR2GRAY};

class LBPHFaceRecognitionController extends Controller
{
    function __construct()
    {
        $this->faceClassifier = new CascadeClassifier();
        $this->faceClassifier->load(storage_path('app/lbpcascade_frontalface.xml'));
        $this->faceRecognizer = LBPHFaceRecognizer::create();

        $this->newModel = storage_path('app/results/lbph_model.xml');
    }
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
     *                 @OA\Property(
     *                     property="name",
     *                     description="username",
     *                     type="text",
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
                'image' => 'required|mimes:png|max:2048',
                'name' => 'required',
            ]);

            if ($payload->failed()) {
                return response([
                    'error' => $payload->getMessageBag()
                ], 400);
            }

            $body = $payload->validated();
            // die(json_encode($body));

            $images = [$request->file('image')];
            $labels = [$body['name']];

            $faceImages = $faceLabels = [];
            foreach ($images as $key => $image) {
                // if (!$key) continue;
                echo "\nexist:" . file_exists($image);
                $src = imread($image);
                $gray = cvtColor($src, COLOR_BGR2GRAY);
                $faces = [];
                $this->faceClassifier->detectMultiScale($gray, $faces);
                //var_export($faces);
                equalizeHist($gray, $gray);
                foreach ($faces as $k => $face) {
                    $faceImages[] = $gray->getImageROI($face); // face coordinates to image
                    $faceLabels[] = $key + 1; // me
                    // imwrite("results/recognize_face_by_lbph_me$k-$key.jpg", $gray->getImageROI($face));
                }

                $this->faceRecognizer->train($faceImages, $faceLabels);
            }
            $this->faceRecognizer->update($faceImages, $faceLabels);

            $this->faceRecognizer->write($this->newModel);


            return response()->json([
                'message' => 'image trained'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e
            ], 500);
        }
    }
}