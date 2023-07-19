<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Validator;

class CompareController extends MemberController
{
    /**
     * Compare two images, upload both.
     *
     * @OA\Post(
     *     path="/compare",
     *     tags={"compare"},
     *     operationId="Compare.compare",
     * @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 type="object",
     *                 @OA\Property(
     *                     property="image1",
     *                     description="First image",
     *                     type="string",
     *                     format="binary"
     *                 ),
     *                 @OA\Property(
     *                     property="image2",
     *                     description="Second image",
     *                     type="string",
     *                     format="binary"
     *                  )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success"
     *     ),
     * )
     */
     public function compare(Request $request) {
        $validator = Validator::make($request->all(), [
            'image1' => 'required|mimes:png|max:2048',
            'image2' => 'required|mimes:png|max:2048',
        ]);

        if ($validator->fails()) {
            return response($validator->getMessageBag(), 400);
        }

        [
            $a_colors_r,
            $a_colors_g,
            $a_colors_b,
            $a_width,
            $a_height,
            ] = $this->get_rgb($request->file('image2')->getPathname());
        // ] = $this->get_rgb("$this->directory_target/DSC08729.jpg");
        // dd($request->file('image1'));
        [
            $b_colors_r,
            $b_colors_g,
            $b_colors_b,
            $b_width,
            $b_height,
        ] = $this->get_rgb($request->file('image1')->getPathname());

        // START MAGNITUDE
        $r_magnitude = $this->get_magnitude($a_colors_r, $b_colors_r);
        $g_magnitude = $this->get_magnitude($a_colors_g, $b_colors_g);
        $b_magnitude = $this->get_magnitude($a_colors_b, $b_colors_b);

        // RESULT
        $result = array_sum([$r_magnitude, $g_magnitude, $b_magnitude]) / 3;

        return response($result);
     }
}
