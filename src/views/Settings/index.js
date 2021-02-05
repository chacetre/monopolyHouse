import React from "react";
import { makeStyles} from "@material-ui/styles";
import {
  Grid,
  Divider,
} from "@material-ui/core";
import { colors } from "@material-ui/core";
import IndexInsee from "./Components/IndexInsee";
import Templates from "./Components/Templates";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
  },
  paper: {
    padding: 10,
  },
  titleBar: {
    backgroundColor: theme.palette.primary.main,
    color: colors.grey[50],
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
  },
  right: {
    paddingTop: 10,
    textAlign: "right",
  },
  gridCell: {
    justifyContent: "center",
  },
  cellRight: {
    paddingTop: 50,
    textAlign: "right",
    paddingRight: 25,
  },
  titleSection: {
    marginBottom: 2,
    marginLeft: 10,
  },
  textWhite: {
    color: colors.grey[50],
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 15,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
  btnAction: {
    backgroundColor: theme.palette.action.main,
    color: theme.palette.white,
  },
  title: {
    paddingTop: 30,
  },
  divider:{
      margin: 50
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} md={12} xs={12}>
          <IndexInsee />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Divider className={classes.divider}/>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Templates />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
