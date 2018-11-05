<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table = 'answers';
    public $primaryKey = 'id';
    public $timestamps = true;

    public function user(){
      return $this->belongsTo('App\User'); 
    }
}
