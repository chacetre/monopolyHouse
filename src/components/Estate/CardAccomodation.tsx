import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/styles";
import {
  Button,
  Card,
  CardHeader,
  colors,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import CreateRounded from "@material-ui/icons/CreateRounded";
import Particulier from "./Particulier";
import Society from "./Society";
import {updateAccomodation, deleteAccomodation} from "../../api/accomodationAPI";
import {calculateTotal, calculTVA} from "../Utils/calculs";
import {convertStringToBool} from "../Utils/converter";
import CustomRadioButton from "../Utils/CustomRadioButton";
import {Estate, initialValueEstate, listRadioButtonStep1, listRadioButtonStep2} from "../../constantes/ConstEstate";
import InputDate from "../Utils/InputDate";
import SelectRecurrence from "../Utils/SelectRecurrence";
import {red} from "@material-ui/core/colors";
import {CancelRounded} from "@material-ui/icons";
import clsx from "clsx";
import ConfirmModal from "../ConfirmModal";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "&.Mui-disabled fieldset": {
        borderColor: "#90D8FF",
      },
    },
    "& label.Mui-disabled": {
      color: "#486C7F",
    },
  },
})(TextField);

function Alert(props :any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme : any) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: 10,
  },
  titleBar: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    color: colors.grey[50],
    marginBottom: 10,
    padding: 10,
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  left: {
    paddingTop: 10,
    textAlign: "left",
  },
  gridCell: {
    justifyContent: "center",
  },
  cellRight: {
    textAlign: "right",
    paddingRight: 25,
  },
  titleSection: {
    marginBottom: 2,
    marginLeft: 10,
  },
  textWhite: {
    color: colors.grey[50],
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 15,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
  btnAction: {
    backgroundColor: theme.palette.action.main,
    color: theme.palette.white,
  },
  containerTitle: {
    paddingTop: 10,
  },
  selectRecurrence : {
    width: "50%",
    marginLeft: 10,
    marginBottom: 2
  }
}));

const CardAccommodation = (props :any) => {
  const {accomodationInfos, indexes } = props;
  const classes = useStyles();
  const [currentAccommo, setCurrentAccommo] = useState<Estate>(initialValueEstate);
  const [isModifying, setModify] = useState(false);
  const [openSnackBarError, setOpenSnackbarError] = useState(false);
  const [openSnackBarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const vertical = "top"
  const horizontal = "center"

  const handleChange = (event: any) => {
    if (event.persist)
      event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      [event.target.name]: event.target.type === "radio"
          ? convertStringToBool(event.target.value)
          : event.target.value,
    }));
  };

  const handleChangeLoyer = (event: any) => {
    if (event.persist)
      event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      loyer: {
        ...formState.loyer,
        [event.target.name]: event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
    }));

  };

  const handleChangeRental = (event: any) => {
    if (event.persist)
      event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      rental: {
        ...formState.rental,
        [event.target.name]: event.target.value
      },
    }));
  };

  function handleModify() {
    if (isModifying) {
      updateAccomodation(currentAccommo);
      // TODO mettre un callBack
      setOpenSnackbarSuccess(true)
    }
    setModify((prev) => !prev);
  }

  function handleDelete(){
    if (isModifying) {
      deleteAccomodation(currentAccommo.id);
      // TODO mettre un callBack
      setOpenSnackbarSuccess(true)
      setModify((prev) => !prev);
    }
  }

  function revisionLoyer(){
    const currentYear : any = new Date().toLocaleString("default", {year: "numeric"});
    const enterYear = currentAccommo.loyer.startDate.split("-")[0]
    const trimestre = currentAccommo.loyer.indiceInsee

    var numFixe : number = Number(currentAccommo.loyer.fixe);

    const tauxAnneeCurrent : number = indexes[`${currentYear}_${trimestre.toUpperCase()}`];
    const tauxAnneePrevious: number  = indexes[`${enterYear}_${trimestre.toUpperCase()}`];

    if (!tauxAnneePrevious || !tauxAnneeCurrent){
      setOpenSnackbarError(true)

    } else {
      const newFixe : number = (numFixe * tauxAnneeCurrent) / tauxAnneePrevious
      currentAccommo.loyer.fixe = Number(newFixe.toFixed(2))
      updateAccomodation(currentAccommo);
    }

  }

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarError(false);
    setOpenSnackbarSuccess(false);
  };


  useEffect(() => {
    if (accomodationInfos !== undefined) {
      setCurrentAccommo(accomodationInfos);
    }
  }, [accomodationInfos]);

  return (
      <Paper variant="outlined" className={classes.container}>
        <Snackbar open={openSnackBarError} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical,horizontal}}>
          <Alert severity="error">
            <Typography variant="h4" className={classes.textWhite} >Vous n'avez pas tous les index insee pour effectuer cette action</Typography>
          </Alert>
        </Snackbar>
        <Snackbar open={openSnackBarSuccess} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical,horizontal}}>
          <Alert severity="success">
            <Typography variant="h4" className={classes.textWhite} >Sauvegardé avec succès</Typography>
          </Alert>
        </Snackbar>
        <ConfirmModal isOpen={openConfirmModal} setOpen={setOpenConfirmModal} handleConfirm={handleDelete}/>
        <Card>
          <CardHeader className={classes.titleBar} title={<Typography variant="h3" className={classes.textWhite}>
            {currentAccommo.rental.isParticulier ? (
                <>
                  {currentAccommo.rental.civility === "mr" ? "M." : "Mme"}{" "}
                  {currentAccommo.rental.lastname?.toUpperCase()}{" "}
                  {currentAccommo.rental.firstname}
                </>
            ): (
                <>
                  {currentAccommo.rental.socialIdentity}
                </>
            ) }
          </Typography>} action={isModifying && <IconButton onClick={(event) => setOpenConfirmModal(true)}> <CancelRounded style={{ color: red[500] }} /></IconButton>} />
        </Card>
        <Paper elevation={0}>
          <CustomRadioButton
              changeFunction={handleChange}
              currentValue={currentAccommo.isCommercial}
              values={listRadioButtonStep1}
              nameRadio="isCommercial"
          />
          <Grid container spacing={4} className={classes.containerTitle}>
            <Grid item className={classes.gridCell}>
              <div className={classes.containerTitle}>
                <Typography variant="h4" className={classes.titleSection}>
                  Locataire
                </Typography>
                {!isModifying && <Typography variant="overline" className={classes.titleSection}>
                  Date d'entrée :{" "}
                  {currentAccommo.loyer !== undefined
                      ? currentAccommo.loyer.startDate
                      : ""}
                </Typography>}
                {isModifying && <InputDate
                    className={classes.titleSection}
                    currentValue={currentAccommo.loyer.startDate}
                    changeFunction={handleChangeLoyer}
                    name="startDate"
                    type="date"/>}
              </div>
            </Grid>
            <Grid item className={classes.gridCell}>
              <CustomRadioButton
                  changeFunction={handleChangeRental}
                  currentValue={currentAccommo.rental.isParticulier}
                  values={listRadioButtonStep2}
                  nameRadio="isParticulier"
              />
            </Grid>
          </Grid>
          {currentAccommo.rental.isParticulier && (
              <Paper elevation={0} className={classes.paper}>
                <Particulier
                    disabled={isModifying}
                    currentOwner={currentAccommo}
                    handleChange={handleChangeRental}
                />
              </Paper>
          )}

          {!currentAccommo.rental.isParticulier && (
              <Paper elevation={0} className={classes.paper}>
                <Society
                    disabled={isModifying}
                    currentEstate={currentAccommo}
                    handleChange={handleChangeRental}
                />
              </Paper>
          )}
        </Paper>

        <Typography variant="h4" className={classes.titleSection}>
          Loyer
        </Typography>
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} xs={3}>
              <TextField
                  size="small"
                  label="Fixe"
                  variant="outlined"
                  fullWidth
                  disabled={!isModifying}
                  name="fixe"
                  value={
                    (currentAccommo.loyer !== undefined &&
                        currentAccommo.loyer.fixe) ||
                    ""
                  }
                  onChange={handleChangeLoyer}
                  type="number"
              />
            </Grid>

            <Grid item lg={3} md={3} xs={3}>
              <TextField
                  size="small"
                  label="Charges"
                  variant="outlined"
                  fullWidth
                  disabled={!isModifying}
                  name="charges"
                  value={
                    (currentAccommo.loyer !== undefined &&
                        currentAccommo.loyer.charges) ||
                    ""
                  }
                  type="number"
                  onChange={handleChangeLoyer}
              />
            </Grid>
            {currentAccommo.loyer !== undefined && currentAccommo.loyer.activeTVA && (
                <Grid item lg={3} md={3} xs={3}>
                  <TextField
                      size="small"
                      label="TVA en %"
                      variant="outlined"
                      fullWidth
                      disabled
                      name="tva"
                      value={
                        (calculTVA(currentAccommo.loyer) || "")
                      }
                      onChange={handleChangeLoyer}
                      InputProps={{
                        readOnly: true,
                      }}
                  />
                </Grid>
            )}

            <Grid item lg={3} md={3} xs={3} className={classes.gridCell}>
              <CssTextField
                  size="small"
                  label="Total"
                  variant="outlined"
                  fullWidth
                  value={calculateTotal(currentAccommo.loyer)}
                  disabled
                  inputProps={{ "aria-label": "naked" }}
              />
            </Grid>
          </Grid>
          <div style={{marginTop: 20}}>
            {isModifying ? <TextField
                size="small"
                label="Indice Insee de ref"
                variant="outlined"
                name="indiceInsee"
                value={
                  (currentAccommo.loyer !== undefined &&
                      currentAccommo.loyer.indiceInsee) ||
                  ""
                }
                onChange={handleChangeLoyer}
            /> : <Typography variant="overline">
              - Indice Insee de ref : {currentAccommo.loyer !== undefined && currentAccommo.loyer.indiceInsee}
            </Typography>}

            {isModifying ? <SelectRecurrence
                    changeFunction={handleChangeLoyer}
                    currentValue={currentAccommo.loyer.recurrence || 1}
                    className={classes.selectRecurrence}
                />
                : <Typography variant="overline" className={classes.titleSection}>
                  - Récurrence de loyer :{" "}
                  {currentAccommo.loyer !== undefined
                      ? currentAccommo.loyer.recurrence + " mois"
                      : ""}
                </Typography>}


          </div>
        </Paper>
        <Paper elevation={0} className={classes.paper}>
          <Grid container className={classes.containerTitle}>
            <Grid item md={4} xs={4}>
              <Button variant="contained" color="secondary" onClick={revisionLoyer}>
                Revision de loyer
              </Button>
            </Grid>
            <Grid item md={8} xs={8} className={classes.right}>
              <Button
                  variant="contained"
                  startIcon={<CreateRounded />}
                  onClick={handleModify}
              >
                {!isModifying && "Modifier"}
                {isModifying && "Sauvegarder"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
  );
};

export default CardAccommodation;
