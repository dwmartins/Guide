<?php 

use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(base_path('routes/api/users.php'));
Route::prefix('auth')->group(base_path('routes/api/auth.php'));
Route::prefix('config')->group(base_path('routes/api/config.php'));