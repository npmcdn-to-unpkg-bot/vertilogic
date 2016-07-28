<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vertilogic extends Model
{
    protected $fillable = [
        'name', 'description', 'picture', 'properties'
    ];

    public function getPropertiesAttribute($val)
    {
        return unserialize($val);
    }
}
