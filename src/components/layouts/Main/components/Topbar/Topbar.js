import React, {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {AppBar, FormControl, Grid, MenuItem, Select, Toolbar} from "@material-ui/core";
import {getOwnerDataBase} from "../../../../../api/ownerAPI";
import {useOwner} from "../../../../../context/owner";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary.dark,
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    color: theme.palette.white,
    fontSize: 20,
    maxHeight: 40,
  },
  rootLink: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  rightSide: {
    textAlign: "right",
    padding: 5,
  },
  formControl: {
    minWidth: 200,
    paddingTop: 10,
    paddingRight: 40,
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();
  const {setOwnerInformations, ownerInformations } = useOwner();
  const [owners, setData] = useState(null);

  function getBossInformations() {
    getOwnerDataBase((response) => {
      setData(response);
    });
  }

  function handleChangeUser(event)  {
    var currentOwner = Object.values(owners).find((user) => user.id = event.target.value)
    setOwnerInformations(currentOwner);
  };

  useEffect(() => {
    getBossInformations();
  }, [ownerInformations]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <RouterLink className={classes.rootLink} to="/">
              <img
                alt="Logo"
                src="/images/logos/logo_final_white.svg"
                width="200"
              />
            </RouterLink>
          </Grid>
          <Grid item xs={6} className={classes.rightSide}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                fullWidth
                value={ownerInformations.id}
                onChange={handleChangeUser}
                autoWidth={false}
                className={classes.title}
              >
                {owners !== null &&
                  Object.values(owners).map((owner, index) => (
                    <MenuItem value={owner.id} key={index}>
                      {!owner.isSociety ? owner.firstname + " " + owner.lastname : owner.socialIdentity}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
