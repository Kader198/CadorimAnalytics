<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(){
        $numOfOperation = DB::table('mytable')->count();

        $nowString = Carbon::now()->toDateTimeString();

        $now = Carbon::now();

        $days30 = $now->sub('30d');

        $days31 = date("Y-m-d", strtotime($days30));

        $today = date("Y-m-d",strtotime($nowString));

        $days = $this->getPeriods($days31,$today);

        $eachAmount = DB::table('mytable')->select('payment_amount')->whereBetween('updated_at',[$days31,$today])->get();
        $arrayOftransaction = DB::table('mytable')->select('*')->whereBetween('updated_at',[$days31,$today])->get();
        $numOfTransaction = $this->getNumOfTransaction($days31,$today);

        return response()->json(['num' => $numOfTransaction]);
        // return response()->json(['days'=> $days,'today' => $today,'daysO' => $days31,'arrayOftransaction' => $arrayOftransaction,'trans' => $numOfTransaction]);
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

    public function getNumOfTransaction($debut,$fin){
        $numOfTransaction = array();
        $courant = strtotime($debut);
        $dernier = strtotime($fin);
        while ($courant <= $dernier) {
            $count = DB::table('mytable')->where('updated_at','like', date('Y-m-d',$courant) .'%')->count();
            $numOfTransaction[] = ['count' => $count,'current_day' => date("d F",$courant)];
            $courant = strtotime('+1 day',$courant);
        }

        return $numOfTransaction;
    }

    public function datesloaded(Request $request) {

        $numOfTransaction = $this->getNumOfTransaction($request->get('dateStart'),$request->get('dateEnd'));

        return response()->json(['num' => $numOfTransaction]);
    }
}
