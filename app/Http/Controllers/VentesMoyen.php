<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class VentesMoyen extends Controller
{
    public function index(){
        $moyen = intval(DB::table('mytable')->avg('payment_amount'));

        $nowString = Carbon::now()->toDateTimeString();

        $now = Carbon::now();

        $days30 = $now->sub('30d');

        $days31 = date("Y-m-d", strtotime($days30));

        $today = date("Y-m-d",strtotime($nowString));

        $averageAmount = $this->getAverageAmount($days31,$today);

        return response()->json(['averageAmount' => $averageAmount]);
    }

    public function getAverageAmount($debut,$fin){
        $AverageVente = array();
        $courant = strtotime($debut);
        $dernier = strtotime($fin);
        while ($courant <=  $dernier) {
            $averageAmount = DB::table('mytable')->where('updated_at','like', date('Y-m-d',$courant).'%')->avg('payment_amount');
            $AverageVente[] = ['days' => date('d F',$courant),'averageAmount' => $averageAmount == null ? 0 : $averageAmount];
            $courant = strtotime('+1 day',$courant);
        }
        return $AverageVente;
    }

    public function datesloaded(Request $request) {
        $days = $this->getAverageAmount($request->get('dateStart'),$request->get('dateEnd'));
        return response()->json(['averageAmount'=> $days]);
    }

}
