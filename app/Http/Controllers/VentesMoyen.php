<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VentesMoyen extends Controller
{
    public function index(){
        return response()->json(['status'=>200]);
    }

    public function getPeriods($debut,$fin){
        $dates = array();
        $courant = strtotime($debut);
        $dernier = strtotime($fin);
        while ($courant <=  $dernier) {
            $dates[] = date('d',$courant);
            $courant = strtotime('+1 day',$courant);
        }
        return $dates;
    }

}
