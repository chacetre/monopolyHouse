import React, {useEffect, useState} from "react";
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
import {steps} from "../../constantes/ConstChooseBoos";
import {initialsValuesAccount, OwnerInformations} from "../../constantes/ConstAccount";
import {convertBoolToString, convertStringToBool} from "../Utils/converter";

const useStyles = makeStyles((theme : any) => ({
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

type PropsOwnerModal = {
  open : boolean,
  className: any,
  onClose: () => void
}

function AddOwnerModal(props : PropsOwnerModal) {
  const { open, className, onClose, ...rest }= props
  const classes = useStyles();
  const [currentOwner, setCurrentOwner] = useState<OwnerInformations>(initialsValuesAccount);
  const [activeStep, setActiveStep] = React.useState(0);

  const goBackStep = (index: number) => {
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
      civility: currentOwner.civility,
      lastname: currentOwner.lastname,
      firstname: currentOwner.firstname,
      isSociety: false,
      socialIdentity: null,
      address: {
        postalCode: currentOwner.address.postalCode,
        city: currentOwner.address.city,
        street: currentOwner.address.street
      },
      isOwner: true,
    }

    saveNewOwnerInDataBase(owner, timestamp)
    onClose();
  }

  function createProprioEntreprise() {
    const timestamp = Date.now();
    const owner = {
      id: timestamp,
      civility: null,
      lastname: null,
      firstname: null,
      isSociety: true,
      socialIdentity: currentOwner.socialIdentity,
      address: {
        postalCode: currentOwner.address.postalCode,
        city: currentOwner.address.city,
        street: currentOwner.address.street,
      },
      isOwner: true,
    }
    saveNewOwnerInDataBase(owner, timestamp)
    onClose();
  }

  function createProprio(){
    if (!currentOwner.isSociety){
      createProprioParticulier()
    } else {
      createProprioEntreprise()
    }
  }

  const handleChange = (event: any) => {
    event.persist();
    setCurrentOwner((currentOwner : OwnerInformations) => ({
      ...currentOwner,
      [event.target.name]:
          event.target.type === "radio"
              ? convertStringToBool(event.target.value)
              : event.target.value
    }));
  };

  const handleChangeCivility = (event: any) => {
    event.persist();
    setCurrentOwner((currentOwner : OwnerInformations) => ({
      ...currentOwner,
      [event.target.name]:
          event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value
    }));
  };

  const handleChangeAddress = (event: any) => {
    event.persist();

    setCurrentOwner((currentOwner : OwnerInformations) => ({
      ...currentOwner,
      address : {
        ...currentOwner.address,
        [event.target.name]: event.target.value
      }
    }));
  };

  const cancelClose = () => {
    onClose();
  };


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
                    name="isSociety"
                    defaultValue="top"
                    onChange={handleChange}
                >
                  <FormControlLabel
                      value={"false"}
                      control={
                        <Radio
                            color="primary"
                            checked={convertBoolToString(currentOwner.isSociety) === "false"}
                        />
                      }
                      label="Particulier"
                      labelPlacement="end"
                  />
                  <FormControlLabel
                      value={"true"}
                      control={
                        <Radio
                            color="primary"
                            checked={convertBoolToString(currentOwner.isSociety) === "true"}
                        />
                      }
                      label="Entreprise"
                      labelPlacement="end"
                  />
                </RadioGroup>
              </div>

              {!currentOwner.isSociety && (
                  <>
                    <RadioGroup
                        row
                        aria-label="civility"
                        name="civility"
                        defaultValue="top"
                        onChange={handleChangeCivility}
                    >
                      <FormControlLabel
                          value={"mr"}
                          control={
                            <Radio
                                color="primary"
                                checked={currentOwner.civility === "mr"}
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
                                checked={currentOwner.civility === "mme"}
                            />
                          }
                          label="Mme"
                          labelPlacement="end"
                      />
                    </RadioGroup>

                    <TextField
                        className={classes.textField}
                        fullWidth
                        label="Prénom"
                        name="firstname"
                        onChange={handleChange}
                        type="text"
                        value={currentOwner.firstname || ""}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        label="Nom"
                        name="lastname"
                        onChange={handleChange}
                        type="text"
                        value={currentOwner.lastname || ""}
                        variant="outlined"
                    />
                  </>
              )}

              {currentOwner.isSociety && (
                  <>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        label="Raison Social"
                        name="socialIdentity"
                        onChange={handleChange}
                        type="text"
                        value={currentOwner.socialIdentity || ""}
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
                    fullWidth
                    label="Numero et rue"
                    name="street"
                    onChange={handleChangeAddress}
                    type="text"
                    value={currentOwner.address.street || ""}
                    variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                    className={classes.textField}
                    fullWidth
                    label="Code Postal"
                    name="postalCode"
                    onChange={handleChangeAddress}
                    type="text"
                    value={currentOwner.address.postalCode || ""}
                    variant="outlined"
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                    className={classes.textField}
                    fullWidth
                    label="City"
                    name="city"
                    onChange={handleChangeAddress}
                    type="text"
                    value={currentOwner.address.city || ""}
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
