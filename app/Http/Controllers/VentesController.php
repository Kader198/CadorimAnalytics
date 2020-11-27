<?php

namespace App\Http\Controllers;
use App\Models\cadorim_analytics as ModelsCadorim_analytics;
use Carbon\Carbon;
use Carbon\Traits\Date;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentesController extends Controller
{
    public function index(){
        $numOfOperation = DB::table('mytable')->count();

        $try = DB::table('mytable')->select('updated_at')->whereBetween('updated_at',['2020-06-02','2020-07-03'])->get();

        $sumOfeachAmount = round(DB::table('mytable')->sum('payment_amount'));
        $venteMoyen =  round($sumOfeachAmount/$numOfOperation);
        // * Here should we have each collections
        $Clients = ModelsCadorim_analytics::all();

        $arrayOfDay = array();

        for ($i=0; $i < 25 ; $i++) {
            $arrayOfDay[$i] = $i + 4;
        }

        $nowString = Carbon::now()->toDateTimeString();

        $now = Carbon::now();

        $days30 = $now->sub('30d');

        $days31 = date("Y-m-d", strtotime($days30));

        $today = date("Y-m-d",strtotime($nowString));

        $days = $this->getPeriods($days31,$today);

        $eachAmount = DB::table('mytable')->select('payment_amount')->whereBetween('updated_at',[$days31,$today])->get();

        return response()->json(['days'=> $days,'sumOfall' => $sumOfeachAmount,'venteMoyen' => $venteMoyen,'today' => $today,'daysO' => $days31,'eachAmount' => $eachAmount]);
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
