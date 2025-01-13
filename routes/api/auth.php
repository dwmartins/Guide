<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post("/login", [AuthController::class, 'login']);
Route::post("/app/login", [AuthController::class, 'adminLogin']);
