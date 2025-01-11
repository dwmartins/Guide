<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JWTManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
}
