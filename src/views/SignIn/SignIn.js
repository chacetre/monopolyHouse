import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { useAuth } from "../../context/auth";
import { useUser } from "../../context/userInformations";
import firebase from "firebase/app";
import {constant} from "underscore";
import {version} from "../../data/constantes";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const CssTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.white,
      fontSize: 16,
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    textAlign: "center",
    width: "100%",
  },
  content: {
    height: "100%",
  },
  form: {
    display: "flex",
    width: "75%",
    flexDirection: "column",
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.white
  },
  titleTextfield: {
    marginBottom: theme.spacing(1),
    color: theme.palette.white,
    textAlign: "left"
  },
  containerTextfield:{
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "75%",
    padding: theme.spacing(3),
  },
  textField: {
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
    color: theme.palette.white,
    backgroundColor: theme.palette.action.main,
  },
  leftContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentBody: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(10),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignIn = (props) => {
  const { history } = props;
  const classes = useStyles();
  const { setUserInformations } = useUser();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const { setAuthTokens } = useAuth();

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  function postLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        formState.values.email,
        formState.values.password
      )
      .then((user) => {
        console.log("user", user.user.uid);
        if (user.user !== null) {
          setUserInformations(user.user.uid);
          var dateNow = new Date().getTime() + 86400000;
          setAuthTokens(dateNow.toString());
          history.push("/select-your-boss");
        } else {
          console.log("user error");
        }
      })
      .catch((error) => {
        console.log("autre error", error.message);
      });
  }

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item lg={5} className={classes.leftContent}>
          <div className={classes.image}>
            <img alt="Logo" src="/images/welcome.svg" />
          </div>
        </Grid>
        <Grid item lg={7}>
          <div className={classes.contentBody}>
            <div className={classes.form}>
              <Typography className={classes.title} variant="h2">
                Connexion
              </Typography>
              <div className={classes.containerTextfield}>
                <Typography variant="overline" className={classes.titleTextfield}>
                  Identifiant
                </Typography>
                <CssTextField
                  className={classes.textField}
                  error={hasError("email")}
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ""}
                  variant="outlined"
                />
              </div>
              <div className={classes.containerTextfield}>
                <Typography variant="overline" className={classes.titleTextfield}>
                  Mot de passe
                </Typography>
                <CssTextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />
              </div>
              <Button
                className={classes.signInButton}
                disabled={!formState.isValid}
                fullWidth
                size="large"
                onClick={postLogin}
                variant="contained"
              >
                Connexion
              </Button>
            </div>
            <div>
              <Typography className={classes.title} variant="caption">
                Version {version}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
