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


        $nowString = Carbon::now()->toDateTimeString();

        $now = Carbon::now();

        $days30 = $now->sub('30d');

        $days31 = date("Y-m-d", strtotime($days30));

        $today = date("Y-m-d",strtotime($nowString));

        $days = $this->getAmountsPerDays($days31,$today);

        return response()->json(['amountsPerDays'=> $days]);
    }

    public function getAmountsPerDays($debut,$fin){
        $amountDays = array();
        $courant = strtotime($debut);
        $dernier = strtotime($fin);
        while ($courant <=  $dernier) {
            $payment_amount = DB::table('mytable')->where('updated_at','like', date('Y-m-d',$courant) .'%')->sum('payment_amount');
            $amountDays[] = ['days' => date('d F',$courant),'payment_amount' => $payment_amount == [] ? 0 : $payment_amount];
            $courant = strtotime('+1 day',$courant);
        }
        return $amountDays;
    }

    // ! load the dates
    public function datesloaded(Request $request) {
        $days = $this->getAmountsPerDays($request->get('dateStart'),$request->get('dateEnd'));
        return response()->json(['amountsPerDays'=> $days]);
    }
    //! End of loading the dates

}
