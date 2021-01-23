import React, { useContext, createContext, useState, useEffect } from "react";
import { Link as RouterLink, withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
} from "@material-ui/core";
import { useAuth } from "../../context/auth";
import { useUser } from "../../context/userInformations";
import firebase from "firebase/app";

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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    textAlign: "center",
    width: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
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
          setUserInformations(user.user.uid)
          var dateNow = new Date().getTime() + 86400000
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

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.form}>
          <Typography className={classes.title} variant="h2">
            Connexion
          </Typography>
          <TextField
            className={classes.textField}
            error={hasError("email")}
            fullWidth
            helperText={hasError("email") ? formState.errors.email[0] : null}
            label="Identifiant"
            name="email"
            onChange={handleChange}
            type="text"
            value={formState.values.email || ""}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            error={hasError("password")}
            fullWidth
            helperText={
              hasError("password") ? formState.errors.password[0] : null
            }
            label="Mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ""}
            variant="outlined"
          />
          <Button
            className={classes.signInButton}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            size="large"
            onClick={postLogin}
            variant="contained"
          >
            Connexion
          </Button>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
