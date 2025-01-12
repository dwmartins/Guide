<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;

class SettingsController extends Controller {
    private $cacheKey = 'settings_all';

    /**
     * @param
     * - 'name' (String): The name of the configuration
     * - 'value' (String): The value of the configuration
     * @return Response 
     */
    public function update(Request $request) {
        $values = $request->validate([
            'name' => 'required',
            'value' => 'required'
        ]);

        try {
            Settings::updateOrCreate(
                ['name' => $values['name']],
                ['value' => $values['value']]
            );
    
            // Remove all settings data from the cache
            Cache::forget($this->cacheKey);

            // Reload all data from the database and put it in the cache
            $settings = Settings::all();
            Cache::put($this->cacheKey, $settings, now()->addMinutes(60));

            return response()->json([
                'message' => SETTINGS_UPDATE_SUCCESSFULLY,
                'data' => $settings
            ]);
    
        } catch (\Exception $e) {
            Log::error('Error updating configuration', [
                'message' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'error' => FATAL_ERROR_MESSAGE,
                'message' => $e->getMessage(), 
            ], 500);
        }
    }

    /**
     * @return Settings
     */
    public function fetchAll(Request $request) {
        try {
            $locale = App::getLocale();
            $timezone = Config::get('app.timezone');

            $settings = Cache::remember($this->cacheKey, 60, function() {
                return Settings::all();
            });

            return response()->json($settings);

        } catch (\Exception $e) {
            Log::error('Error fetching settings', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => FATAL_ERROR_MESSAGE,
            ], 500);
        }
    }
}
