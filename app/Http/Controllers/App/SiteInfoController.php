<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\SiteInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SiteInfoController extends Controller {
    private $cacheKey = 'site_info';

    public function fetchAll(Request $request) {
        try {
            $siteInfo = Cache::remember($this->cacheKey, config('constants.cache_time'), function() {
                return SiteInfo::first();
            });

            return response()->json($siteInfo);

        } catch (\Exception $e) {
            Log::error('Error fetching website information', [
                'message' => $e->getMessage(),
            ]);
    
            return response()->json([
                'error' => trans('messages.fatal_error_message'),
            ], 500);
        }
    }

    public function update(Request $request) {
        $validatedData = $request->validate([
            'webSiteName' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:100',
            'phone' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'x' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string'
        ]);

        try {
            $siteInfo = SiteInfo::first();

            if(!$siteInfo) {
                $siteInfo = SiteInfo::create($validatedData);
            } else {
                $siteInfo->update($validatedData);
            }

            Cache::forget($this->cacheKey);
            Cache::put($this->cacheKey, $siteInfo, now()->addMinutes(config('constants.cache_time')));

            return response()->json([
                'message' => trans('messages.site_information_updated_successfully')
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating website information', [
                'message' => $e->getMessage(),
            ]);
    
            return response()->json([
                'message' => trans('messages.fatal_error_message'),
            ], 500);
        }
    }
}
