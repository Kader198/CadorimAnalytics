import React from "react";
import { Switch,Route } from 'react-router';
import { Tab, Tabs } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Ventes } from "./beyondComponent/Ventes-app";
import { Transaction } from "./beyondComponent/transaction-app";
import { Moyen } from "./beyondComponent/Moyen-app";
export const Container = (props) => {
    return (
        <Switch>
            <Route exact component={Ventes}/>
            <Route path={"/trans"} component={Transaction}/>
            <Route path={"/Moyen"} component={Moyen}/>
        </Switch>
    );
}
