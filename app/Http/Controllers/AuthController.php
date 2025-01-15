<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JWTManager;
use Illuminate\Http\Exceptions\HttpResponseException;
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

    /**
     * @param token
     * @return User
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    public function checkAuth(Request $request) {
        try {
            $validationData = $this->validateToken($request);

            $user = User::find($validationData['user_id']);

            if(!empty($user) && $user->active === "Y") {
                $tokenDecode = JWTManager::validate($validationData['token'], $user);

                if(!empty($tokenDecode) && !isset($tokenDecode->expired)) {
                    return response()->json([
                        "authenticated" => true,
                        "user" => $user
                    ]);
                } else if(isset($tokenDecode->expired)) {
                    return response()->json([
                        'message' => trans('messages.session_expired'),
                        'expiredToken' => true,
                        'logout' => true,
                        'authenticated' => false
                    ], 401);
                }
            }

            return response()->json([
                'message' => trans('messages.not_logged'),
                'logout' => true,
                'authenticated' => false
            ]);

        } catch (HttpResponseException $e){
            throw $e;
            
        } catch (\Exception $e) {
            Log::error('Error checking authentication', [
                'message' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => trans('messages.fatal_error_message'),
                'logout' => true 
            ], 500);
        }
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

            return response()->json([
                'message' => trans('messages.fatal_error_message'), 
            ], 500);
        }
    }

    /**
     * @param Request
     * @return array user_id || user token
     */
    private function validateToken(Request $request) {
        $token = $request->header('Authorization');

        if(!$token || !str_starts_with($token, 'Bearer ')) {
            $this->handleInvalidToken(trans('messages.token_invalid'));
        }

        $token = trim(str_replace('Bearer ', '', $token));
        
        try {
            $payload = JWTManager::getPayload($token);

            return [
                'user_id' => $payload['user_id'],
                'token' => $token
            ];
        } catch (\Exception $e) {
            $this->handleInvalidToken(trans('messages.token_invalid'));
        }
    }

    /**
     * @param string $message
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    private function handleInvalidToken(string $message): void {
        throw new HttpResponseException(
            response()->json([
                'message' => $message,
                'logout' => true
            ], 401)
        );
    }
}
