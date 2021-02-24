import React from "react";

import { makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  Grid,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  imageContainer: {
    marginRight: 20,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
  },
  image: {
    width: "100%",
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const Address = (props) => {
  const { handleChange, currentAccommo } = props;
  const classes = useStyles();

  const hasError = (field) => {

    return currentAccommo.touched[field] && currentAccommo.errors[field]
      ? true
      : false;
  };

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          error={hasError("street")}
          helperText={
            hasError("street") ? currentAccommo.errors.street[0] : null
          }
          label="Numero et rue"
          name="street"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.values.address !== undefined &&
              currentAccommo.values.address.street) ||
            ""
          }
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          error={hasError("otherInformations")}
          helperText={
            hasError("otherInformations")
              ? currentAccommo.errors.otherInformations[0]
              : null
          }
          label="Complément d'adresse (ex: numero d'appartement"
          name="otherInformations"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.values.address !== undefined &&
              currentAccommo.values.address.otherInformations) ||
            ""
          }
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          className={classes.textField}
          error={hasError("postalCode")}
          helperText={
            hasError("postalCode") ? currentAccommo.errors.postalCode[0] : null
          }
          variant="outlined"
          size="small"
          label="Code Postal"
          name="postalCode"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.values.address !== undefined &&
              currentAccommo.values.address.postalCode) ||
            ""
          }
        />
      </Grid>
      <Grid item xs={9}>
        <TextField
          size="small"
          fullWidth
          error={hasError("city")}
          helperText={hasError("city") ? currentAccommo.errors.city[0] : null}
          label="City"
          name="city"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.values.address !== undefined &&
              currentAccommo.values.address.city) ||
            ""
          }
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

Address.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default Address;
