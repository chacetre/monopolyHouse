import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
import clsx from "clsx";
import { makeStyles} from "@material-ui/styles";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import { useOwner } from "../../context/owner";
import { saveNewAccommodation } from "../../request/accomodationAPI";
import Loyer from "./Loyer";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LogementArea from "./LogementArea";
import LocataireArea from "./LocataireArea";
import Paper from "@material-ui/core/Paper";
import {
  initialValueAccomo,
  schema,
  schemaAddress,
  schemaLoyer,
  schemaRental,
  steps
} from "../../views/Accomodation/ConstEstateModal";

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
  divider: {
    margin: 10,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  paper:{
    padding: 10
  },
  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }, button : {
    marginLeft: 15
  },
  indiceInsee:{
    marginBottom: 10
  }
}));


function AddEstateModal({ open, className, onClose, ...rest }) {
  const classes = useStyles();
  const { ownerInformations } = useOwner();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentAccommo, setCurrentAccommo] = useState(initialValueAccomo);

  function createEstateDB() {
    const timestamp = Date.now();
    saveNewAccommodation(
        currentAccommo.values,
        timestamp,
        ownerInformations.id
    );
    setCurrentAccommo(initialValueAccomo)
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
    setCurrentAccommo(initialValueAccomo)
    setActiveStep(0)
    onClose();
  };

  const goBackStep = (index) => {
    setActiveStep(index)
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length){
      createEstate()
      return
    } 

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const activateButton = (activeStep === 0 && validate(currentAccommo.values.address, schemaAddress)) ||
      (activeStep === 1 && validate(currentAccommo.values.rental, schemaRental)) ||
      (activeStep === 2 && validate(currentAccommo.values.loyer, schemaLoyer))

  const hasError = (field) =>
      !!(currentAccommo.touched[field] && currentAccommo.errors[field]);

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

    setCurrentAccommo((formState) => ({
      ...formState,
      isValid: !errors,
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

            <Paper className={classes.paper}>
              {activeStep === 0 && <LogementArea handleChange={handleChange} currentAccommo={currentAccommo} hasError={hasError} handleChangeAddress ={handleChangeAddress} />}
              {activeStep === 1 && <LocataireArea handleChangeRental={handleChangeRental} currentAccommo={currentAccommo} hasError={hasError}/>}
              {activeStep === 2 &&
              <>
                <TextField
                    size="small"
                    fullWidth
                    className={classes.indiceInsee}
                    error={hasError("indiceInsee")}
                    helperText="Doit etre sous la forme : T1, T2, T3, T4"
                    label="Indice Insee de référence"
                    name="indiceInsee"
                    onChange={handleChangeLoyer}
                    type="text"
                    value={
                      ((currentAccommo.values.loyer.indiceInsee) || "")
                    }
                    variant="outlined"
                />
                <Loyer
                    handleChange={handleChangeLoyer}
                    currentEstate={currentAccommo.values}
                />
              </>
              }
            </Paper>
          </CardContent>
          <Divider />
          <CardActions disableSpacing className={classes.right}>
            <Button onClick={cancelClose}>annuler</Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={classes.button}
                disabled={activateButton}
            >
              {activeStep === steps.length - 1 ? 'Créer' : 'Suivant'}
            </Button>
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
