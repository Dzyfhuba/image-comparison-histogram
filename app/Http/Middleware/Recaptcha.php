<?php

namespace App\Http\Middleware;

use App\Models\RecaptchaLog;
use Closure;
use Http;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Recaptcha
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // get token from header X-Token
        $token = $request->header('X-Token');

        //get RECAPTCHA_SITE_KEY from .env
        $siteKey = env('RECAPTCHA_SECRET_KEY');
        // echo $token;

        $data = [
            'secret' => $siteKey,
            'response' => $token,
            // 'remoteip' => $request->ip(),
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/x-www-form-urlencoded'
        ])
        ->post("https://www.google.com/recaptcha/api/siteverify?secret={$siteKey}&response={$token}&remoteip={$request->ip()}");

        RecaptchaLog::create([
            'remote_ip' => $request->ip(),
            'success' => $response->json()['success'],
            'error_codes' => array_key_exists('error-codes', $response->json()) ? json_encode($response->json()['error-codes']) : null,
            'hostname' => array_key_exists('hostname', $response->json()) ? $response->json()['hostname'] : null,
            'challenge_ts' => array_key_exists('challenge_ts', $response->json()) ? $response->json()['challenge_ts'] : null,
        ]);

        if ($response->json()['success']) {
            return $next($request);
        } else {
            return response([
                'error' => $response->json()['error-codes']
            ], 400);
        }
    }
}
