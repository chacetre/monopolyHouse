import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";

const PrivateRoute = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;
  const { authTokens } = useAuth();

  function verifyToken(token) {

    var isValid = true
    var dateNow = new Date()

    if (Number(token) < dateNow.getTime()){
      isValid = false;
      localStorage.removeItem("tokens")
    } 

    return isValid
  }
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        verifyToken(authTokens) ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default PrivateRoute;
