<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JWTManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller {
    public function login(Request $request) {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        $rememberMe = $request->rememberMe ?? false;

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $token = JWTManager::generate($user, $rememberMe);

        return response()->json([
            'message' => 'Login bem-sucedido',
            'token' => $token,
            'userData' => $user
        ]);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout bem-sucedido']);
    }

    public function adminLogin(Request $request) {
        $request->validate([
            "email" => "required|email",
            "password" => "required|min:" . config('constants.min_password_length')
        ]);

        try {
            $rememberMe = $request->rememberMe ?? false;

            $user = User::where('email', $request->email)->first();

            if($user && $user->active === "Y") {
                if(!in_array($user->role, config('constants.has_access_app'))) {
                    return response()->json([
                        'message' => trans('messages.access_denied')
                    ], 401);
                }

                if(Hash::check($request->password, $user->password)) {
                    $token = JWTManager::generate($user, $rememberMe);

                    return response()->json([
                        'message' => trans('messages.login_successful'),
                        'token' => $token,
                        'user' => $user
                    ]);
                }
            }

            return response()->json(['error' => trans('messages.invalid_credentials')], 401);

        } catch (\Exception $e) {
            Log::error('Error logging in', [
                'message' => $e->getMessage(),
                'request_data' => $request->all()
            ]);
        }
    }
}
