<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Str;
use Validator;

class MemberController extends Controller
{
    protected $directory_target;
    function __construct()
    {
        $this->directory_target = storage_path('members/kyc');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::all();
        return response($members);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|alpha_num',
            'kyc_image' => 'required|mimes:png,jpg,jpeg'
        ]);

        if ($validator->fails()) {
            return response($validator->getMessageBag(), 400);
        }

        $payload = $validator->validated();

        $image = $request->file('kyc_image');


        $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
        $image->move($this->directory_target, $filename);

        $member = Member::create([
            ...$payload,
            'kyc_image' => $filename
        ]);

        return response([
            'data' => $member
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Member::find($id);

        return response([
            'data' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required|alpha_num',
                'kyc_image' => 'required|mimes:png,jpg,jpeg'
            ]);

            if ($validator->fails()) {
                return response($validator->getMessageBag(), 400);
            }

            $payload = $validator->validated();

            $member = Member::find($id);

            if (!$member) {
                return response([], 204);
            }

            if ($member->kyc_image && file_exists("$this->directory_target/$member->kyc_image")) {
                unlink("$this->directory_target/$member->kyc_image");
            }

            $image = $request->file('kyc_image');


            $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move($this->directory_target, $filename);

            $member->update([
                ...$payload,
                'kyc_image' => $filename
            ]);

            return response([
                'data' => $member
            ], 201);
        } catch (\Exception $e) {
            return response([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $member = Member::find($id);

        if ($member && file_exists("$this->directory_target/$member->kyc_image")) {
            unlink("$this->directory_target/$member->kyc_image");
            $member->delete();
        }

        return response([
            'message' => 'delete success'
        ]);
    }

    public function kyc_image($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response([], 204);
        }

        return response()->file("$this->directory_target/$member->kyc_image");
    }

    public function compare_similarity(Request $request)
    {
        $member = Member::find(3);
        $image = imagecreatefrompng("$this->directory_target/$member->kyc_image"); // imagecreatefromjpeg/png/

        $width = imagesx($image);
        $height = imagesy($image);
        $colors = [];
        
        $color_r = [];
        $color_g = [];
        $color_b = [];

        for ($y = 0; $y < $height; $y++) {
            $y_array = [];

            $y_array_r = [];
            $y_array_g = [];
            $y_array_b = [];

            for ($x = 0; $x < $width; $x++) {
                $rgb = imagecolorat($image, $x, $y);
                $r = ($rgb >> 16) & 0xFF;
                $g = ($rgb >> 8) & 0xFF;
                $b = $rgb & 0xFF;

                $x_array = [
                    'r' => $r, 
                    'g' => $g, 
                    'b' => $b
                ];
                $y_array[] = $x_array;
                
                $y_array_r[] = $r;
                $y_array_g[] = $g;
                $y_array_b[] = $b;
            }
            
            $colors[] = $y_array;

            $colors_r[] = $y_array_r;
            $colors_g[] = $y_array_g;
            $colors_b[] = $y_array_b;
        }

        return response([
            'r' => $colors_r,
            'g' => $colors_g,
            'b' => $colors_b
        ]);
    }
}