import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useOwner } from "../../context/owner";
import { updateOwner } from "../../api/ownerAPI";
import {OwnerInformations, initialsValuesAccount} from "../../constantes/ConstAccount";

const AccountDetails = (props : any) => {
  const { className, ...rest } = props;
  const { ownerInformations, setOwnerInformations } = useOwner();
  const [localOwner, setLocalOwner] = useState<OwnerInformations>(initialsValuesAccount);

  const handleChange = (event :any) => {
    setLocalOwner({
      ...localOwner,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddress = (event : any) => {
    setLocalOwner({
      ...localOwner,
      address: {
        ...localOwner.address,
        [event.target.name]: event.target.value.toLowerCase(),
      }
    });
  };

  function handleUpdateOwner(){
    setOwnerInformations(localOwner)
    updateOwner(localOwner)
  }

  useEffect(() => {
    if (ownerInformations !== undefined) {
      setLocalOwner(ownerInformations);
    }
  }, [ownerInformations]);

  return (
    <Card {...rest}>
      <form autoComplete="off" noValidate>
        <CardHeader title="Profil" />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <RadioGroup
                row
                name="isSociety"
                defaultValue="top"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"false"}
                  control={
                    <Radio
                      color="secondary"
                      checked={Boolean(localOwner.isSociety) === false}
                    />
                  }
                  label="Particulier"
                  labelPlacement="end"
                  disabled={false}
                />
                <FormControlLabel
                  value={"true"}
                  control={
                    <Radio
                      color="secondary"
                      checked={Boolean(localOwner.isSociety) === true}
                    />
                  }
                  label="Entreprise"
                  disabled={false}
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
            <Grid item md={12} xs={12}>
              <RadioGroup
                row
                name="civility"
                defaultValue="top"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"m"}
                  control={
                    <Radio
                      color="secondary"
                      checked={localOwner.civility === "m"}
                    />
                  }
                  label="M."
                  labelPlacement="end"
                  disabled={false}
                />
                <FormControlLabel
                  value={"mme"}
                  control={
                    <Radio
                      color="secondary"
                      checked={localOwner.civility === "mme"}
                    />
                  }
                  label="Mme"
                  disabled={false}
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Prénom"
                margin="dense"
                name="firstname"
                onChange={handleChange}
                required
                value={localOwner.firstname || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nom"
                margin="dense"
                name="lastname"
                onChange={handleChange}
                required
                value={localOwner.lastname || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Numero et rue"
                margin="dense"
                name="street"
                onChange={handleAddress}
                value={localOwner.address.street || ""}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <TextField
                fullWidth
                label="Code postal"
                margin="dense"
                name="postalCode"
                onChange={handleAddress}
                value={localOwner.address.postalCode || ""}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={9} xs={6}>
              <TextField
                fullWidth
                label="Ville"
                margin="dense"
                name="city"
                onChange={handleAddress}
                value={localOwner.address.city || ""}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleUpdateOwner}>
            Sauvegarder
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
