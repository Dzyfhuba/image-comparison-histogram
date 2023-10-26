<?php

namespace App\Http\Controllers\v2;

use App\Http\Controllers\Controller;
use App\Models\PredictLog;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $predictedLogs = PredictLog::query()
            ->where(function ($query) use ($request) {
                if ($request->query('username'))
                    $query->where('username', $request->query('username'));
            })
            ->orderBy('created_at', 'desc')
            ->join('kyc', 'kyc.id', 'predict_logs.user_id')
            ->select('predict_logs.*', 'kyc.username')
            ->get();

        return inertia('v2/Dashboard', [
            'predictedLogs' => $predictedLogs
        ]);
    }

    public function newFace()
    {
        return inertia('v2/NewFace');
    }
}
