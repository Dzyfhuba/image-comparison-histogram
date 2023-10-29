<?php

namespace App\Http\Controllers\v2;

use App\Http\Controllers\Controller;
use App\Models\KYC;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = KYC::query()
            ->where(function(Builder $query) use ($request) {
                if ($request->query('search'))
                    $query->where('username', 'like', '%' . $request->query('search') . '%');
            })
            ->orderBy('created_at', $request->query('sort', 'desc'))
            ->get();

        return inertia('v2/Users', [
            'users' => $users
        ]);
    }

    public function trainedImage($filename)
    {
        $path = storage_path('app/trained_images/' . $filename);
        $file = file_get_contents($path);

        return response($file, 200, [
            'Content-Type' => 'image/jpeg'
        ]);
    }
}
