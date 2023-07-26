<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Psy\CodeCleaner\NoReturnValue;
use Validator;
use Str;
use App\Models\KYC;
use App\Models\TrainLog;

use CV\Face\LBPHFaceRecognizer, CV\CascadeClassifier, CV\Scalar, CV\Point;
use function CV\{imread, imwrite, cvtColor, equalizeHist};
use const CV\{COLOR_BGR2GRAY};

class LBPHFaceRecognitionController extends Controller
{
    function __construct()
    {
        $this->faceClassifier = new CascadeClassifier();
        $this->faceClassifier->load(storage_path('app/lbpcascade_frontalface.xml'));
        $this->faceRecognizer = LBPHFaceRecognizer::create();

        $this->newModelPath = storage_path('app/results/lbph_model.xml');

        $this->trainedImagePath = storage_path('app/trained_images');
        if (!file_exists($this->trainedImagePath))
            mkdir($this->trainedImagePath);

        $this->predictedImagePath = storage_path('app/predicted_images');
        if (!file_exists($this->predictedImagePath))
            mkdir($this->predictedImagePath);
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
     *                     property="username",
     *                     description="username",
     *                     type="text",
     *                 ),
     *                 @OA\Property(
     *                     property="replace",
     *                     description="replace",
     *                     type="boolean",
     *                     default="false",
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
                'username' => 'required',
                'replace' => 'in:false,true'
            ]);

            if ($payload->fails()) {
                return response([
                    'error' => $payload->getMessageBag()
                ], 400);
            }

            $body = $payload->validated();
            $exist = KYC::query()->where('username', $body['username'])->exists();
            if ($body['replace'] === 'false' && $exist) {
                return response()->json([
                    'error' => [
                        'username' => 'username is not unique'
                    ]
                ], 400);
            }

            $newFileName = Str::uuid() . "." . $request->file('image')->getClientOriginalExtension();
            $fullPath = "$this->trainedImagePath/$newFileName";
            // move file
            $request->file('image')->move($this->trainedImagePath, $newFileName);

            $kyc = null;
            if (!$exist) {
                $kyc = KYC::create([
                    ...$body,
                    'trained_image' => $fullPath
                ]);
            } else {
                $kyc = KYC::query()->where('username', $body['username'])->first();
                if (file_exists($kyc->trained_image)) {
                    unlink($kyc->trained_image);
                }
                KYC::query()->where('username', $body['username'])
                    ->update([
                        'trained_image' => $fullPath
                    ]);
                $kyc = KYC::query()->where('username', $body['username'])->first();
            }

            $this->faceRecognizer->read($this->newModelPath);

            $images = [$fullPath];
            $labels = [$body['username']];

            $faceImages = $faceLabels = [];
            // foreach ($images as $key => $image) {
            // if (!$key) continue;
            // echo "\nexist:" . file_exists($image);
            // var_dump($fullPath);
            // var_dump(file_exists($fullPath));
            $src = imread($fullPath);
            $gray = cvtColor($src, COLOR_BGR2GRAY);
            $faces = [];
            $this->faceClassifier->detectMultiScale($gray, $faces);
            //var_export($faces);
            equalizeHist($gray, $gray);
            foreach ($faces as $k => $face) {
                $faceImages[] = $gray->getImageROI($face); // face coordinates to image
                $faceLabels[] = $kyc->id; // me
                // imwrite("results/recognize_face_by_lbph_me$k-$key.jpg", $gray->getImageROI($face));
            }

            // $this->faceRecognizer->train($faceImages, $faceLabels);
            // }
            $this->faceRecognizer->update($faceImages, $faceLabels);

            $this->faceRecognizer->write($this->newModelPath);
            TrainLog::create([
                'kyc_id' => $kyc->id
            ]);

            return response()->json([
                'message' => 'image trained',
                'kyc_id' => $kyc->id,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/lbph_face_recognition/predict",
     *     operationId="predictLBPHFaceRecognition",
     *     tags={"Face Recognition"},
     *     summary="Predict LBPH Face Recognition",
     *     description="Predict the LBPH Face Recognition model with an image.",
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
     *                     property="username",
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
    public function predict(Request $request)
    {
        try {
            $payload = Validator::make($request->all(), [
                'image' => 'required|mimes:png|max:2048',
                'username' => 'required',
            ]);

            if ($payload->fails()) {
                return response([
                    'error' => $payload->getMessageBag()
                ], 400);
            }

            $body = $payload->validated();

            $this->faceRecognizer->read($this->newModelPath);

            $newFileName = Str::uuid() . "." . $request->file('image')->getClientOriginalExtension();
            $fullPath = "$this->predictedImagePath/$newFileName";
            // move file
            $request->file('image')->move($this->predictedImagePath, $newFileName);

            $src = imread($fullPath);
            $gray = cvtColor($src, COLOR_BGR2GRAY);
            $faces = [];
            $this->faceClassifier->detectMultiScale($gray, $faces);
            $detecteds = [];

            equalizeHist($gray, $gray);
            foreach ($faces as $key => $face) {
                $faceImage = $gray->getImageROI($face);

                $faceConfidence = null;

                //predict
                $faceLabel = $this->faceRecognizer->predict($faceImage, $faceConfidence);
                $label = KYC::query()
                    ->select([
                        'username',
                    ])
                    ->where('id', $faceLabel)
                    ->first()->username;
                $percentage = number_format(100 - $faceConfidence, 2);
                $text = $percentage . " - " . $label;
                $detected[] = $label;
                echo "{$key} - {$faceLabel} - {$text}\n";

                $scalar = new Scalar(0, 0, 255);
                \CV\rectangleByRect($src, $face, $scalar, 2);

                \CV\rectangle($src, $face->x, $face->y, $face->x + $face->width, $face->y - 60, new Scalar(255, 255, 255), -2);
                \CV\putText($src, "$percentage", new Point($face->x, $face->y - 32), 0, 1.5, new Scalar(), 2);
                \CV\putText($src, $label, new Point($face->x, $face->y - 2), 0, 1.5, new Scalar(), 2);
            }

            // cv\imwrite("results/_recognize_face_by_lbph.jpg", $src);
            imwrite(storage_path('app/results/_recognize_face_by_lbph.jpg'), $src);

            $detected = in_array($body['username'], $detected) ?
                'your image classified' :
                'reupload your image';

            return response()->json([

            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e
            ]);
        }
    }
}