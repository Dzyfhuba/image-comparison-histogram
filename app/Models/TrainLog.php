<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'kyc_id'
    ];
}
