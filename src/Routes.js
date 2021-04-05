import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Accommodation from "./views/Estate/Estate";
import ChooseBoos from "./views/ChooseBoss";
import Receipts from "./views/Receipt/Receipts";
import Settings from "./views/Settings";
import TemplateEdit from "./views/Settings/Components/TemplateEdit";
import { Main as MainLayout, Minimal as MinimalLayout } from "./components/layouts";

import PrivateRoute from "./components/PrivateRoute";
import RouteWithLayout from "./components/RouteWithLayout";
import Account from "./views/Account";
import NotFound from "./views/NotFound";
import SignIn from "./views/SignIn";

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
        component={Receipts}
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
        component={NotFound}
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
