import React, {useEffect, useState} from "react";
import validate from "validate.js";
import {makeStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Modal,} from "@material-ui/core";
import {useOwner} from "../../context/owner";
import {saveNewAccommodation} from "../../api/accomodationAPI";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Paper from "@material-ui/core/Paper";
import {schema, schemaAddress, schemaLoyer, schemaRental, steps} from "../../constantes/ConstEstateModal";
import {Estate, initialValueEstate} from "../../constantes/ConstEstate";
import Step3 from "./Steps/Step3";
import {CancelRounded} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";

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
  }
}));

type AddEstateModalProps = {
  open : boolean,
  onClose: () => void
}

const AddEstateModal = (props : AddEstateModalProps) => {
  const { open, onClose, ...rest } = props
  const classes = useStyles();
  const { ownerInformations } = useOwner();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [currentAccommo, setCurrentAccommo] = useState<Estate>(initialValueEstate);
  const [errors, setErrors] = useState({})

  function createEstateDB() {

    const timestamp = Date.now();
    saveNewAccommodation(
        currentAccommo,
        timestamp,
        ownerInformations.id
    );
    setCurrentAccommo(initialValueEstate)
    setActiveStep(0);
    onClose();
  }

  function createEstate() {
    if (Object.values(errors).length === 0) {
      createEstateDB();
    }
  }

  const handleChange = (event : any) => {
    if (event.persist)
      event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      [event.target.name]:
          event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
    }));
  };

  const handleChangeLoyer = (event : any) => {

    event.persist();
    setCurrentAccommo((formState) => ({
      ...formState,
      loyer: {
        ...formState.loyer,
        [event.target.name]: event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      }
    }));
  };

  const handleChangeRental = (event : any) => {
    if (event.persist)
      event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      rental: {
        ...formState.rental,
        [event.target.name]: event.target.value,
      }
    }));
  };

  const handleChangeAddress = (event : any) => {
    event.persist();
    setCurrentAccommo((formState) => ({
      ...formState,
      address: {
        ...formState.address,
        [event.target.name]: event.target.value,
      }
    }));
  };

  const cancelClose = () => {
    setCurrentAccommo(initialValueEstate)
    setActiveStep(0)
    onClose();
  };

  const goBackStep = (index : number) => {
    setActiveStep(index)
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length){
      createEstate()
      return
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    if (activeStep - 1 < 0){
      return
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const activateButton = (activeStep === 0 && validate(currentAccommo.address, schemaAddress)) ||
      (activeStep === 1 && validate(currentAccommo.rental, schemaRental)) ||
      (activeStep === 2 && validate(currentAccommo.loyer, schemaLoyer))


  useEffect(() => {
    const errorsGeneral = validate(currentAccommo, schema);
    const errorsAddress = validate(
        currentAccommo.address,
        schemaAddress
    );
    const errorsRental = validate(currentAccommo.rental, schemaRental);
    const errorsLoyer = validate(currentAccommo.loyer, schemaLoyer);

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

    setErrors(errors || {})

  }, [currentAccommo]);

  if (!open) {
    return null;
  }

  return (
      <Modal onClose={onClose} open={open}>
        <Card {...rest} className={classes.root}>
          <CardHeader title={"Ajouter un nouveau bien"} action={
            <IconButton onClick={cancelClose}>
              <CancelRounded style={{ color: red[500] }} />
            </IconButton>
          } />
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
              {activeStep === 0 && <Step1 handleChange={handleChange} currentAccommo={currentAccommo} handleChangeAddress={handleChangeAddress} />}
              {activeStep === 1 && <Step2 handleChangeRental={handleChangeRental} currentAccommo={currentAccommo}/>}
              {activeStep === 2 && <Step3 handleChange={handleChangeLoyer} currentAccommo={currentAccommo} />}
            </Paper>
          </CardContent>
          <Divider />
          <CardActions disableSpacing className={classes.right}>
            <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevious}
                className={classes.button}
            >
              Précedent
            </Button>
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

export default AddEstateModal;