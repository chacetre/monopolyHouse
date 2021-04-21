import React from "react";
import { makeStyles} from "@material-ui/styles";
import {
  Grid,
  Divider,
} from "@material-ui/core";
import { colors } from "@material-ui/core";
import IndexInsee from "../../components/Settings/IndexInsee";
import Templates from "../../components/Settings/Templates";

const useStyles = makeStyles((theme : any) => ({
  root: {
    padding: theme.spacing(6),
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
