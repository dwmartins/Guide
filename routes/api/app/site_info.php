<?php

use App\Http\Controllers\App\SiteInfoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SiteInfoController::class, 'fetchAll']);
Route::post('/', [SiteInfoController::class, 'update']);