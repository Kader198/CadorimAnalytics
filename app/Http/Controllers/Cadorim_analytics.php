<?php

namespace App\Http\Controllers;
use App\Models\cadorim_analytics as ModelsCadorim_analytics;
use Carbon\Carbon;
use Carbon\Traits\Date;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Cadorim_analytics extends Controller
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

        $now = Carbon::now()->toDateTimeString();;

        $days = $this->getPeriods('2020-7-10','2020-8-10');

        return view('cadorim.index', compact('Clients','numOfOperation','sumOfeachAmount','venteMoyen','days'));
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


