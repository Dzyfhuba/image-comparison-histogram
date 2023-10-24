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
        $model = storage_path('app/lbpcascade_frontalface.xml');
        if (!file_exists($model))
            throw new \Exception("model not found");
        $this->faceClassifier->load(storage_path('app/lbpcascade_frontalface.xml'));
        $this->faceRecognizer = LBPHFaceRecognizer::create();

        // create folder if not exist
        if (!file_exists(storage_path('app/results')))
            mkdir(storage_path('app/results'));
        $this->newModelPath = storage_path('app/results/lbph_model.xml');

        $this->trainedImagePath = storage_path('app/trained_images');
        if (!file_exists($this->trainedImagePath))
            mkdir($this->trainedImagePath);

        $this->predictedImagePath = storage_path('app/predicted_images');
        if (!file_exists($this->predictedImagePath))
            mkdir($this->predictedImagePath);
    }
    /**
     * @OA\Get(
     *     path="/lbph/test",
     *     operationId="testLBPHFaceRecognition",
     *     tags={"face recognition"},
     *     summary="Predict LBPH Face Recognition",
     *     description="Predict the LBPH Face Recognition model with an image.",
     *     @OA\Response(
     *         response=200,
     *         description="Success response",
     *         @OA\MediaType(
     *             mediaType="text/plain",
     *             @OA\Schema(
     *                 type="string"
     *             )
     *         )
     *     ),
     * )
     */
    public function test()
    {
        echo "If you can read this, Local Binary Pattern Histogram System is work\n";
        // Create a reflection class for the ExampleClass
        $reflectionClass = new \ReflectionClass('CV\Face\LBPHFaceRecognizer');

        // Get the list of public methods
        $publicMethods = $reflectionClass->getMethods(\ReflectionMethod::IS_PUBLIC);

        // Get the list of properties (attributes)
        $properties = $reflectionClass->getProperties();

        // Display the results
        echo "Public methods:\n";
        foreach ($publicMethods as $method) {
            echo $method->getName() . "\n";
        }

        echo "\nProperties (attributes):\n";
        foreach ($properties as $property) {
            echo $property->getName() . "\n";
        }
    }
    /**
     * @OA\Post(
     *     path="/lbph/train",
     *     operationId="trainLBPHFaceRecognition",
     *     tags={"face recognition"},
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
     *                     description="Image file (PNG or JPG format, less than 2048KB)",
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
                'image' => 'required|mimes:png,jpg|max:2048',
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

            if (file_exists($this->newModelPath))
                $this->faceRecognizer->read($this->newModelPath);

            $images = [$fullPath];
            $labels = [$body['username']];

            $faceImages = $faceLabels = [];
            // foreach ($images as $key => $image) {
            // if (!$key) continue;
            // echo "\nexist:" . file_exists($image);
            $src = imread($fullPath);
            $gray = cvtColor($src, COLOR_BGR2GRAY);
            $faces = [];
            $this->faceClassifier->detectMultiScale($gray, $faces);
            // dump($faces, $gray);
            // detected face is not one
            if (count($faces) !== 1) {
                return response()->json([
                    'error' => [
                        'image' => 'image must contain one face'
                    ]
                ], 400);
            }

            //var_export($faces);
            // dump($gray);
            equalizeHist($gray, $gray);
            foreach ($faces as $k => $face) {
                $faceImages[] = $gray->getImageROI($face); // face coordinates to image
                $faceLabels[] = $kyc->id; // me
                // imwrite("results/recognize_face_by_lbph_me$k-$key.jpg", $gray->getImageROI($face));
            }

            // $this->faceRecognizer->train($faceImages, $faceLabels);
            // }
            $this->faceRecognizer->update($faceImages, $faceLabels);

            // write $faceImages and $faceLabels to txt file in storage_path('app/results') use php native
            $file = fopen(storage_path('app/results/faceImages.txt'), 'w');
            fwrite($file,json_encode($faceImages));
            fclose($file);
            $file = fopen(storage_path('app/results/faceLabels.txt'), 'a');
            fwrite($file, json_encode($faceLabels));
            fclose($file);

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
     *     path="/lbph/predict",
     *     operationId="predictLBPHFaceRecognition",
     *     tags={"face recognition"},
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
     *                     description="Image file (PNG or JPG format, less than 2048KB)",
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
                'image' => 'required|mimes:png,jpg|max:2048',
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

            // detected face is not one
            if (count($faces) !== 1) {
                return response()->json([
                    'error' => [
                        'image' => 'image must contain one face'
                    ]
                ], 400);
            }

            $detecteds = [];
            $percentages = [];
            $labels = KYC::all();
            $texts = [];

            equalizeHist($gray, $gray);

            // by detected face
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
                // $label = $faceLabel;
                $percentage = number_format(100 - $faceConfidence, 2);
                $percentages[] = $percentage;
                $text = $percentage . " - " . $label;
                $texts[] = $text;
                $detecteds[] = $label;
                // echo "{$key} - {$faceLabel} - {$text}\n";
                // $texts[] = "{$key} - {$faceLabel} - {$text}\n";

                $scalar = new Scalar(0, 0, 255);
                \CV\rectangleByRect($src, $face, $scalar, 2);

                \CV\rectangle($src, $face->x, $face->y, $face->x + $face->width, $face->y - 60, new Scalar(255, 255, 255), -2);
                \CV\putText($src, "$percentage", new Point($face->x, $face->y - 32), 0, 1.5, new Scalar(), 2);
                \CV\putText($src, $label, new Point($face->x, $face->y - 2), 0, 1.5, new Scalar(), 2);
            }

            // cv\imwrite("results/_recognize_face_by_lbph.jpg", $src);
            $filename = $body['username'] . "_" . Str::uuid() . ".jpg";
            imwrite(storage_path("app/scores/$filename"), $src);

            $isCorrect = in_array($body['username'], $detecteds);
            $message = $isCorrect ?
                'your image classified' :
                'your image not classified, please try again with better image';

            return response()->json([
                'message' => $message,
                'texts' => $texts,
                'score' => $percentages,
                'detecteds' => $detecteds,
            ], $isCorrect ? 200 : 400);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e
            ]);
        }
    }
}