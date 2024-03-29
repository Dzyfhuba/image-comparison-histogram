<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PredictLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'result_path',
        'user_id',
        'score',
        'detected_user_id',
    ];
    
    // has one in User
    public function user(): HasOne
    {
        return $this->hasOne(KYC::class);
    }
}
