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


            $filename = Str::uuid().'.'.$image->getClientOriginalExtension();
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

        if($member && file_exists("$this->directory_target/$member->kyc_image")) {
            unlink("$this->directory_target/$member->kyc_image");
            $member->delete();
        }

        return response([
            'message' => 'delete success'
        ]);
    }
}