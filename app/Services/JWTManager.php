<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class JWTManager
{
    public static function generate(User $user, bool $rememberMe)
    {
        $payload = [
            "user_id" => $user->id,
            "email"   => $user->email,
        ];

        // Remember me: 14 days (2 weeks)
        // Default login: 4 hours
        $payload["exp"] = time() + ($rememberMe ? (14 * 24 * 60 * 60) : (4 * 60 * 60));

        return JWT::encode($payload, $user->token, 'HS256');
    }

    public static function validate($token, User $user)
    {
        try {
            $decoded = JWT::decode($token, new Key($user->token, 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            if ($e->getMessage() === "Expired token") {
                $expiredObject = new stdClass();
                $expiredObject->expired = true;
                return $expiredObject;
            }

            return false;
        }
    }

    public static function newCrypto()
    {
        $randomBytes = random_bytes(32);
        $hexString = bin2hex($randomBytes);
        return $hexString;
    }

    public static function getPayload(string $token)
    {
        $base64Url = explode('.', $token)[1];
        $base64 = str_replace(['-', '_'], ['+', '/'], $base64Url);
        return json_decode(base64_decode($base64), true);
    }
}
