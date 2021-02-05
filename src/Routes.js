import PrivateRoute from "components/PrivateRoute";
import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Accommodation from "views/Accomodation";
import ChooseBoos from "views/ChooseBoss";
import Receipt from "views/Receipt";
import Settings from "views/Settings";
import TemplateEdit from "views/Settings/Components/TemplateEdit";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  NotFound as NotFoundView,
  SignIn,
  Account,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/select-your-boss" />

      <PrivateRoute
        component={ChooseBoos}
        exact
        layout={MinimalLayout}
        path="/select-your-boss"
      />
      <PrivateRoute
        component={Account}
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
      
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={Settings}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={TemplateEdit}
        exact
        layout={MainLayout}
        path="/settings/template/:idTemplate"
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
