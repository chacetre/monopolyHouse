import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Button,
  TextField,
  Select,
  InputLabel,
} from "@material-ui/core";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: "60%",
    maxHeight: "90%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  actions: {
    justifyContent: "flex-end",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    margin: 10,
  },
}));

function AddOwnerModal({ open, className, onClose, ...rest }) {
  const classes = useStyles();
  var database = firebase.database();
  const [currentOwner, setCurrentOwner] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  function createProprioParticulier() {
    const timestamp = Date.now();

    database.ref("id_user/owners/" + timestamp).set({
      id: timestamp,
      civility: currentOwner.values.civility,
      lastname: currentOwner.values.lastname,
      firstname: currentOwner.values.firstname,
      isSociety: false,
      socialIdentity: null,

      address: {
        postalCode: "92789",
        city: "Marseille",
        street: "23 rue henri martin",
      },
      isOwner: true,
    });

    onClose();
  }

  function createProprioEntreprise() {
    const timestamp = Date.now();

    database.ref("id_user/owners/" + timestamp).set({
      id: timestamp,
      civility: null,
      lastname: null,
      firstname: null,
      isSociety: true,
      socialIdentity: currentOwner.values.socialIdentity,
      address: {
        postalCode: currentOwner.values.postalCode,
        city: currentOwner.values.city,
        street: currentOwner.values.street,
      },
      isOwner: true,
    });

    onClose();
  }

  function createProprio(){
       if (currentOwner.values.isParticulier === "true"){
           createProprioParticulier()
       } else {
           createProprioEntreprise()
       }
  }

  const handleChange = (event) => {
    event.persist();

    setCurrentOwner((currentOwner) => ({
      ...currentOwner,
      values: {
        ...currentOwner.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...currentOwner.touched,
        [event.target.name]: true,
      },
    }));
  };

  const cancelClose = () => {
    onClose();
  };

  const hasError = (field) =>
    currentOwner.touched[field] && currentOwner.errors[field] ? true : false;

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title={"Ajouter un nouveau propriétaire"} />
        <Divider />
        <CardContent>
          <RadioGroup
            row
            aria-label="position"
            name="isParticulier"
            defaultValue="top"
            onChange={handleChange}
            className={classes.gridCell}
          >
            <FormControlLabel
              value={"true"}
              control={
                <Radio
                  color="primary"
                  checked={currentOwner.values.isParticulier === "true"}
                />
              }
              label="Particulier"
              labelPlacement="right"
            />
            <FormControlLabel
              value={"false"}
              control={
                <Radio
                  color="primary"
                  checked={currentOwner.values.isParticulier === "false"}
                />
              }
              label="Entreprise"
              labelPlacement="right"
            />
          </RadioGroup>

          {currentOwner.values.isParticulier === "true" && (
            <>
              <RadioGroup
                row
                aria-label="civility"
                name="civility"
                defaultValue="top"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"mr"}
                  control={
                    <Radio
                      color="primary"
                      checked={currentOwner.values.civility === "mr"}
                    />
                  }
                  label="Mr"
                  labelPlacement="right"
                />
                <FormControlLabel
                  value={"mme"}
                  control={
                    <Radio
                      color="primary"
                      checked={currentOwner.values.civility === "mme"}
                    />
                  }
                  label="Mme"
                  labelPlacement="right"
                />
              </RadioGroup>

              <TextField
                className={classes.textField}
                error={hasError("firstname")}
                fullWidth
                helperText={
                  hasError("firstname")
                    ? currentOwner.errors.firstname[0]
                    : null
                }
                label="Firstname"
                name="firstname"
                onChange={handleChange}
                type="text"
                value={currentOwner.values.firstname || ""}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={hasError("lastname")}
                fullWidth
                helperText={
                  hasError("lastname") ? currentOwner.errors.lastname[0] : null
                }
                label="Lastname"
                name="lastname"
                onChange={handleChange}
                type="text"
                value={currentOwner.values.lastname || ""}
                variant="outlined"
              />
            </>
          )}

          {currentOwner.values.isParticulier === "false" && (
            <>
              <TextField
                className={classes.textField}
                error={hasError("socialIdentity")}
                fullWidth
                helperText={
                  hasError("socialIdentity")
                    ? currentOwner.errors.socialIdentity[0]
                    : null
                }
                label="Raison Social"
                name="socialIdentity"
                onChange={handleChange}
                type="text"
                value={currentOwner.values.socialIdentity || ""}
                variant="outlined"
              />
            </>
          )}

          <Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                error={hasError("street")}
                fullWidth
                helperText={
                  hasError("street") ? currentOwner.errors.street[0] : null
                }
                label="Numero et rue"
                name="street"
                onChange={handleChange}
                type="text"
                value={currentOwner.values.street || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                className={classes.textField}
                error={hasError("postalCode")}
                fullWidth
                helperText={
                  hasError("postalCode") ? currentOwner.errors.postalCode[0] : null
                }
                label="Code Postal"
                name="postalCode"
                onChange={handleChange}
                type="text"
                value={currentOwner.values.postalCode || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                error={hasError("city")}
                fullWidth
                helperText={
                  hasError("city") ? currentOwner.errors.city[0] : null
                }
                label="City"
                name="city"
                onChange={handleChange}
                type="text"
                value={currentOwner.values.city || ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <Button onClick={cancelClose}>annuler</Button>
          <Button onClick={createProprio}>créer</Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

AddOwnerModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

AddOwnerModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default AddOwnerModal;
