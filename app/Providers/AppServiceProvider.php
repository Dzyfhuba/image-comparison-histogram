<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * @OA\Info(
 *     version="0.1",
 *     title="Image Comparison using Cosine Similarity Method",
 * )
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="local host"
 * )
 * @OA\Server(
 *     url="http://localhost/image-comparison/api",
 *     description="in port 80"
 * )
 * @OA\Server(
 *     url="http://localhost/api",
 *     description="in port 80"
 * )
 * @OA\Server(
 *     url="http://20.20.20.42/image-comparison/api",
 *     description="TIF Akreditasi 2"
 * )
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
