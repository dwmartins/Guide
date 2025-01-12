<?php

use App\Http\Controllers\App\SettingsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SettingsController::class, 'fetchAll']);
Route::put('/', [SettingsController::class, 'update']);
