<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(){
        return json_encode(['status' => "Its work fine"]);
    }
}
