import PrivateRoute from "components/PrivateRoute";
import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Accommodation from "views/Accomodation";
import ChooseBoos from "views/ChooseBoss";
import Receipt from "views/Receipt";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  Stock as UserListView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SignIn,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/select-your-boss" />

      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={Receipt}
        exact
        layout={MainLayout}
        path="/receipts"
      />
      <PrivateRoute
        component={Accommodation}
        exact
        layout={MainLayout}
        path="/accommodations"
      />
      <PrivateRoute
        component={ChooseBoos}
        exact
        layout={MinimalLayout}
        path="/select-your-boss"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />

      <RouteWithLayout
        component={SignIn}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
