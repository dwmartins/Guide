<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteInfo extends Model {
    protected $table = 'site_info';

    protected $fillable = [
        'webSiteName', 'email', 'phone', 'city', 'state', 'address',
        'instagram', 'facebook', 'x', 'description', 'keywords',
        'ico', 'logoImage', 'coverImage', 'defaultImage',
    ];
}
