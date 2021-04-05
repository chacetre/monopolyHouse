import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {Estate} from "../../constantes/ConstEstate";

type AddressProps = {
  handleChange : (event: any) => void,
  currentAccommo: Estate
}

const Address = (props : AddressProps) => {
  const { handleChange, currentAccommo } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          label="Numero et rue"
          name="street"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.address !== undefined &&
              currentAccommo.address.street) ||
            ""
          }
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          label="Complément d'adresse (ex: numero d'appartement"
          name="otherInformations"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.address !== undefined &&
              currentAccommo.address.otherInformations) ||
            ""
          }
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Code Postal"
          name="postalCode"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.address !== undefined &&
              currentAccommo.address.postalCode) ||
            ""
          }
        />
      </Grid>
      <Grid item xs={9}>
        <TextField
          size="small"
          fullWidth
          label="City"
          name="city"
          onChange={handleChange}
          type="text"
          value={
            (currentAccommo.address !== undefined &&
              currentAccommo.address.city) ||
            ""
          }
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default Address;
