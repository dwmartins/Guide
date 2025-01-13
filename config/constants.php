<?php 

return [
    // Setting cache time (in minutes)
    'cache_time' => 10080, // 7 days = 10,080 minutes
    
    // Setting the minimum number of characters for the password
    'min_password_length' => 6,

    // Translation files
    'translation_files' => [
        'messages.php',
        'validation.php'
    ],

    // List of all roles that exist in the system
    'allowed_roles' => ['support', 'admin', 'mod', 'test', 'visitor', 'sponsor'],

    // Lista de papéis (roles) que têm acesso ao painel administrativo do site
    // Apenas os usuários com esses papéis poderão acessar as funcionalidades do dashboard.
    'has_access_app' => ['support', 'admin', 'mod', 'test'],
];