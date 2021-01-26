import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
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
  FormControl,
  Button,
  TextField,
  Select,
  FormHelperText,
} from "@material-ui/core";
import firebase from "firebase/app";
import Particulier from "./Particulier";
import { useOwner } from "../../../context/owner";
import Society from "./Society";
import { saveNewAccommodation } from "request/accomodationAPI";
import Loyer from "./Loyer";
import Address from "./Address";

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

const schema = {
  address: {
    presence: { allowEmpty: false, message: "is required" },
  },
  isCommercial: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const schemaAddress = {
  postalCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 5,
      minimum: 5,
    },
  },
  street: {
    presence: { allowEmpty: false, message: "is required" },
  },
  city: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const schemaLoyer = {
  fixe: {
    presence: { allowEmpty: false, message: "is required" },
  },
  charges: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const schemaRental = {};

function AddEstateModal({ open, className, onClose, ...rest }) {
  const classes = useStyles();
  const { ownerInformations } = useOwner();
  const [currentAccommo, setCurrentAccommo] = useState({
    isValid: false,
    values: {
      rental: {},
      address: {},
    },
    touched: {},
    errors: {},
  });

  function createEstateDB() {
    const timestamp = Date.now();
    saveNewAccommodation(
      currentAccommo.values,
      timestamp,
      ownerInformations.id
    );
    onClose();
  }

  function createEstate() {
    if (currentAccommo.isValid) {
      createEstateDB();
    }
  }

  const handleChange = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
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

  const handleChangeLoyer = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        loyer: {
          ...formState.values.loyer,
          [event.target.name]: event.target.value,
        },
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleChangeRental = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        rental: {
          ...formState.values.rental,
          [event.target.name]: event.target.value,
        },
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleChangeAddress = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        address: {
          ...formState.values.address,
          [event.target.name]: event.target.value,
        },
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const cancelClose = () => {
    onClose();
  };

  const hasError = (field) =>
    currentAccommo.touched[field] && currentAccommo.errors[field]
      ? true
      : false;

  useEffect(() => {
    const errorsGeneral = validate(currentAccommo.values, schema);
    const errorsAddress = validate(
      currentAccommo.values.address,
      schemaAddress
    );
    const errorsRental = validate(currentAccommo.values.rental, schemaRental);
    const errorsLoyer = validate(currentAccommo.values.loyer, schemaLoyer);

    let errors = Object.assign(
      {},
      errorsGeneral,
      errorsAddress,
      errorsRental,
      errorsLoyer
    );

    if (Object.keys(errors).length === 0) {
      errors = undefined;
    }

    console.log("errors", errors)

    setCurrentAccommo((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [currentAccommo.values]);

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title={"Ajouter un nouveau bien"} />
        <Divider />
        <CardContent>
          <FormControl
            component="fieldset"
            error={true}
            className={classes.formControl}
          >
            <RadioGroup
              row
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
                    checked={currentAccommo.values.isCommercial === "false"}
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
                    checked={currentAccommo.values.isCommercial === "true"}
                  />
                }
                label="Local Commercial"
                labelPlacement="right"
              />
            </RadioGroup>
            {hasError("isCommercial") ? (
              <Typography>currentAccommo.errors.isCommercial[0]</Typography>
            ) : null}
          </FormControl>
          <Typography variant="h4" className={classes.titleSection}>
            2. Adresse
          </Typography>

          <Address
            handleChange={handleChangeAddress}
            currentAccommo={currentAccommo}
          />

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
                  checked={
                    currentAccommo.values.rental.isParticulier === "null"
                  }
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
                  checked={
                    currentAccommo.values.rental.isParticulier === "true"
                  }
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
                  checked={
                    currentAccommo.values.rental.isParticulier === "false"
                  }
                />
              }
              label="Entreprise"
              labelPlacement="right"
            />
          </RadioGroup>
          <TextField
            size="small"
            fullWidth
            error={hasError("startDate")}
            helperText={
              hasError("startDate") ? currentAccommo.errors.startDate[0] : null
            }
            label="Date d'entrée"
            name="startDate"
            onChange={handleChangeRental}
            type="text"
            value={
              (currentAccommo.values.rental != undefined &&
                currentAccommo.values.rental.startDate) ||
              ""
            }
            variant="outlined"
          />
          <div className={classes.container}>
            {currentAccommo.values.rental.isParticulier === "true" && (
              <Particulier
                handleChange={handleChangeRental}
                currentOwner={currentAccommo.values}
                disabled={true}
              />
            )}
            {currentAccommo.values.rental.isParticulier === "false" && (
              <Society
                handleChange={handleChangeRental}
                currentEstate={currentAccommo.values}
                disabled={true}
              />
            )}
          </div>

          <Typography variant="h4" className={classes.titleSection}>
            4. Loyer
          </Typography>
          <Loyer
            handleChange={handleChangeLoyer}
            currentEstate={currentAccommo.values}
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
