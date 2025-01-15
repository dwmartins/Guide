<?php 

use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(base_path('routes/api/users.php'));
Route::prefix('auth')->group(base_path('routes/api/auth.php'));

Route::prefix('site_info')->group(base_path('routes/api/app/site_info.php'));

Route::prefix('settings')->group(function () {
    require base_path('routes/api/app/settings.php');
});

Route::fallback(function() {
    return response()->json([
        "message" => "Rote not found.",
        "requested_url" => request()->fullUrl(),
        "method" => request()->method(),
        "code" => 404
    ], 404);
});