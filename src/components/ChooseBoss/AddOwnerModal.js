import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles} from "@material-ui/styles";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
} from "@material-ui/core";
import firebase from "firebase/app";
import { saveNewOwnerInDataBase } from "../../request/ownerAPI";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {steps} from "./ConstChooseBoos";

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
  button: {
    marginLeft: 5
  },
  textField: {
    marginBottom: 10
  },
  container: {
    padding: 10
  }
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
  const [activeStep, setActiveStep] = React.useState(0);

  const goBackStep = (index) => {
    setActiveStep(index)
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length){
      createProprio()
      return
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function createProprioParticulier() {
    const timestamp = Date.now();
    const owner = {
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
    }

    saveNewOwnerInDataBase(owner, timestamp)
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

            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps} onClick={() => goBackStep(index)}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 &&
            <div className={classes.container}>
              <div className={classes.center}>
                < RadioGroup
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
                      labelPlacement="end"
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
                      labelPlacement="end"
                  />
                </RadioGroup>
              </div>

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
                          label="M."
                          labelPlacement="end"
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
                          labelPlacement="end"
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
                        label="Prénom"
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
                        label="Nom"
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
            </div>
            }

            {activeStep === 1 &&
            <Grid container spacing={2}>
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
            }
          </CardContent>
          <Divider />
          <CardActions disableSpacing className={classes.center}>
            <Button onClick={cancelClose}>annuler</Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Créer' : 'Suivant'}
            </Button>
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
