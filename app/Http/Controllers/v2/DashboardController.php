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
            ->leftJoin('kyc as a', 'a.id', 'predict_logs.user_id')
            ->leftJoin('kyc as b', 'b.id', 'predict_logs.detected_user_id')
            ->select('predict_logs.*', 'a.username', 'b.username as detected')
            ->get();

            // dd($predictedLogs);

        return inertia('v2/Dashboard', [
            'predictedLogs' => $predictedLogs
        ]);
    }

    public function newFace()
    {
        return inertia('v2/NewFace');
    }
}
