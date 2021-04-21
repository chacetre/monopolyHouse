import React, {useState} from "react";
// @ts-ignore
import {Router} from "react-router-dom";
// @ts-ignore
import {createBrowserHistory} from "history";
import {ThemeProvider} from "@material-ui/styles";
import validate from "validate.js";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./Routes";
import firebase from "firebase/app";
import config from "./Firebase/config";
import {AuthContext} from "./context/auth";
import {UserContext} from "./context/userInformations";
import {OwnerContext} from "./context/owner";
import {LoggedUser, OwnerInformations} from "./constantes/ConstAccount";

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators,
};

const App = () => {

  let existingTokens = ""
  if (localStorage.getItem("tokens")){
    existingTokens = JSON.parse(localStorage.getItem("tokens") ? localStorage.getItem("tokens") || "" : "") || "";
  }

  const [authTokens, setAuthTokens] = useState<string>(existingTokens);


  let existingOwner = {}
  const storageOwner = localStorage.getItem("owner")
  if (storageOwner){
    console.log("get owner",localStorage.getItem("owner") )
    existingOwner = JSON.parse(localStorage.getItem("owner") || "");
  }
  const [ownerInformations, setOwnerInformations] = useState<OwnerInformations>(existingOwner);

  const existingUser = JSON.parse(localStorage.getItem("logged_user") || "");
  const [userInformations, setUserInformations] = useState<LoggedUser>(existingUser);

  const setTokens = (data : string) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const setOwner = (data : OwnerInformations) => {
    console.log("set owner", data)
    localStorage.setItem("owner", JSON.stringify(data));
    setOwnerInformations(data);
  };

  const setUser = (data : LoggedUser) => {
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
