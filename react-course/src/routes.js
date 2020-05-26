import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Product from "./pages/product";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Main} exact></Route>
            <Route path="/product/:id" component={Product}></Route>
        </Switch>
    </BrowserRouter>
)

export default Routes;