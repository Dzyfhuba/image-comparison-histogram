<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecaptchaLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'remote_ip',
        'success',
        'error_codes',
        'hostname',
        'challenge_ts',
    ];
}
