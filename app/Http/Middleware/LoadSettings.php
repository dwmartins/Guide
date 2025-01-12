<?php

namespace App\Http\Middleware;

use App\Models\Settings;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class LoadSettings {
    private $cacheKey = 'settings_all';

    public function handle(Request $request, Closure $next) {
        try {
            // Fetch the bank settings
            $settings = Cache::get($this->cacheKey);

            if(!$settings) {
                $settings = Settings::pluck('value', 'name')->toArray();
                Cache::put('settings_all', $settings, now()->addMinutes(60));
            }

            // Set the language (if found in the database, otherwise 'pt-br')
            $this->setLocale($settings);

            // Set the timezone (if found in the database, otherwise 'America/Sao_Paulo')
            $this->setTimezone($settings);

            // Set default date (if found in database)
            $this->setDateFormat($settings);

            return $next($request);
        } catch (\Exception $e) {
            Log::error('Error loading settings', [
                'message' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Oops, an error occurred, please try again.'
            ], 500);
        }
    }

    private function setLocale($settings) {
        $locale = $settings['language'] ?? 'pt-br';
        App::setLocale($locale);

        $translationsPath = resource_path('lang/' . $locale . '.php');
        
        if (!File::exists($translationsPath)) {
            $errorMessage = "Translation file for language {$locale} not found at $translationsPath";
            Log::error($errorMessage);
            throw new \Exception($errorMessage);
        } else {
            include($translationsPath);
        }
    }

    private function setTimezone($settings) {
        $timezone = $settings['timezone'] ?? 'America/Sao_Paulo';
        Config::set('app.timezone', $timezone);

        date_default_timezone_set($timezone);
    }

    private function setDateFormat($settings) {
        $dateFormat = $settings['date_format'] ?? 'DD-MM-YYYY';
        Config::set('app.date_format', $dateFormat);
    }
}