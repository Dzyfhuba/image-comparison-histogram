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
 *     description="API server"
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
