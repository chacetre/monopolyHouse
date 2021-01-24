import React, { Component, useState } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";
import { chartjs } from "./helpers";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./Routes";
import firebase from "firebase/app";
import config from "./components/Firebase/config";
import { AuthContext } from "./context/auth";
import { UserContext } from "context/userInformations";
import { OwnerContext } from "context/owner";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

validate.validators = {
  ...validate.validators,
  ...validators,
};

const App = (props) => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const existingOwner = JSON.parse(localStorage.getItem("owner"));
  const [ownerInformations, setOwnerInformations] = useState(existingOwner);

  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  const [userInformations, setUserInformations] = useState(existingUser);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const setOwner = (data) => {
    localStorage.setItem("owner", JSON.stringify(data));
    setUserInformations(data);
  };

  const setUser = (data) => {
    localStorage.setItem("logged_user", JSON.stringify(data));
    setUserInformations(data);
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <UserContext.Provider
          value={{ userInformations, setUserInformations: setUser }}
        >
          <OwnerContext.Provider
            value={{ ownerInformations, setOwnerInformations: setOwner }}
          >
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </OwnerContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
