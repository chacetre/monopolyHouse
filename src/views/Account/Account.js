import React from "react";
import { makeStyles } from "@material-ui/styles";

import { AccountDetails } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AccountDetails />
    </div>
  );
};

export default Account;
