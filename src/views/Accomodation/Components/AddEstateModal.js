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
import Particulier from "./Particulier";
import { useOwner } from "../../../context/owner";
import Society from "./Society";
import { saveNewAccommodation } from "request/accomodationAPI";
import Loyer from "./Loyer";

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
  titleSection: {
    marginRight: 15,
    marginLeft: 10,
  },
  gridCell: {
    alignItems: "center",
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
  },
}));

function AddEstateModal({ open, className, onClose, ...rest }) {
  const classes = useStyles();
  const { ownerInformations } = useOwner();
  const [currentOwner, setCurrentAccommo] = useState({
    rental: {},
    address: {},
  });

  function createEstateDB() {
    const timestamp = Date.now();
    saveNewAccommodation(currentOwner, timestamp, ownerInformations.id);
    onClose();
  }

  function createEstate() {
    console.log(currentOwner);
    createEstateDB();
  }

  const handleChange = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeLoyer = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      loyer: {
        ...formState.loyer,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handleChangeRental = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      rental: {
        ...formState.rental,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handleChangeAddress = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      address: {
        ...formState.address,
        [event.target.name]: event.target.value.toLowerCase(),
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
        <CardHeader title={"Ajouter un nouveau bien"} />
        <Divider />
        <CardContent>
          <RadioGroup
            row
            aria-label="isCommercial"
            name="isCommercial"
            defaultValue="top"
            onChange={handleChange}
            className={classes.gridCell}
          >
            <Typography variant="h4" className={classes.titleSection}>
              1. Type de bien
            </Typography>
            <FormControlLabel
              value={"false"}
              control={
                <Radio
                  color="primary"
                  checked={currentOwner.isCommercial === "false"}
                />
              }
              label="Habitation"
              labelPlacement="right"
            />
            <FormControlLabel
              value={"true"}
              control={
                <Radio
                  color="primary"
                  checked={currentOwner.isCommercial === "true"}
                />
              }
              label="Local Commercial"
              labelPlacement="right"
            />
          </RadioGroup>

          <Typography variant="h4" className={classes.titleSection}>
            2. Adresse
          </Typography>

          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Numero et rue"
                name="street"
                onChange={handleChangeAddress}
                type="text"
                value={
                  (currentOwner.address != undefined &&
                    currentOwner.address.street) ||
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
                onChange={handleChangeAddress}
                type="text"
                value={
                  (currentOwner.address != undefined &&
                    currentOwner.address.otherInformations) ||
                  ""
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                label="Code Postal"
                name="postalCode"
                onChange={handleChangeAddress}
                type="text"
                value={
                  (currentOwner.address != undefined &&
                    currentOwner.address.postalCode) ||
                  ""
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                size="small"
                fullWidth
                label="City"
                name="city"
                onChange={handleChangeAddress}
                type="text"
                value={
                  (currentOwner.address != undefined &&
                    currentOwner.address.city) ||
                  ""
                }
                variant="outlined"
              />
            </Grid>
          </Grid>

          <RadioGroup
            row
            name="isParticulier"
            defaultValue="top"
            onChange={handleChangeRental}
            className={classes.gridCell}
          >
            <Typography variant="h4" className={classes.titleSection}>
              3. Locataire
            </Typography>
            <FormControlLabel
              value={"null"}
              control={
                <Radio
                  color="primary"
                  checked={currentOwner.rental.isParticulier === "null"}
                />
              }
              label="Vide"
              labelPlacement="right"
            />
            <FormControlLabel
              value={"true"}
              control={
                <Radio
                  color="primary"
                  checked={currentOwner.rental.isParticulier === "true"}
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
                  checked={currentOwner.rental.isParticulier === "false"}
                />
              }
              label="Entreprise"
              labelPlacement="right"
            />
          </RadioGroup>
          <TextField
                size="small"
                fullWidth
                label="Date d'entrée"
                name="startDate"
                onChange={handleChangeRental}
                type="text"
                value={
                  (currentOwner.rental != undefined &&
                    currentOwner.rental.startDate) ||
                  ""
                }
                variant="outlined"
              />
          <div className={classes.container}>
            {currentOwner.rental.isParticulier === "true" && (
              <Particulier
                handleChange={handleChangeRental}
                currentOwner={currentOwner}
                disabled={true}
              />
            )}
            {currentOwner.rental.isParticulier === "false" && (
              <Society
                handleChange={handleChangeRental}
                currentEstate={currentOwner}
                disabled={true}
              />
            )}
          </div>

          <Typography variant="h4" className={classes.titleSection}>
            4. Loyer
          </Typography>
          <Loyer
            handleChange={handleChangeLoyer}
            currentEstate={currentOwner}
          />
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <Button onClick={cancelClose}>annuler</Button>
          <Button onClick={createEstate}>créer</Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

AddEstateModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

AddEstateModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default AddEstateModal;
