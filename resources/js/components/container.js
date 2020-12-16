import React from "react";
import { Switch,Route, Redirect } from 'react-router';

import { Ventes } from "./beyondComponent/Ventes-app";
import { Transaction } from "./beyondComponent/transaction-app";
import { Moyen } from "./beyondComponent/Moyen-app";
import { My404Component } from "./beyondComponent/My404Component";
export const Container = (props) => {
    return (
        <Switch>
            <Route path={"/cadorim"} exact component={Ventes}/>
            <Route path={"/transaction"} component={Transaction}/>
            <Route path={"/Moyen"} component={Moyen}/>
            <Route path={'/*'}  component={My404Component} />
        </Switch>
    );
}
