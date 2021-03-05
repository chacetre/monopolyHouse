import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { colors } from "@material-ui/core";
import CreateRounded from "@material-ui/icons/CreateRounded";
import Particulier from "./Particulier";
import Society from "./Society";
import { updateAccomodation } from "request/accomodationAPI";
import {calculateTotal, calculTVA} from "../Utils/calculs";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: 10,
  },
  titleBar: {
    backgroundColor: theme.palette.secondary.main,
    color: colors.grey[50],
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
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
}));

const CardAccommodation = (props) => {
  const {accomodationInfos, indexes } = props;
  const classes = useStyles();
  const [currentAccommo, setCurrentAccommo] = useState({});
  const [isModifying, setModify] = useState(false);
  const [openSnackBarError, setOpenSnackbarError] = useState(false);
  const vertical = "top"
  const horizontal = "center"

  const handleChange = (event) => {
    event.persist();

    setCurrentAccommo((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeLoyer = (event) => {
    event.persist();

    const re = /^[0-9\b]+$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      setCurrentAccommo((formState) => ({
        ...formState,
        loyer: {
          ...formState.loyer,
          [event.target.name]: event.target.value,
        },
      }));
    }
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

  function handleModify() {
    if (isModifying) {
      updateAccomodation(currentAccommo);
    }
    setModify((prev) => !prev);
  }

  function revisionLoyer(){
    const currentYear = new Date().toLocaleString("default", {year: "numeric"});
    const previousYear = currentYear - 1
    const trimestre = currentAccommo.loyer.indiceInsee

    var numFixe = Number(currentAccommo.loyer.fixe);

    const tauxAnneeCurrent = indexes[`${currentYear}_${trimestre.toUpperCase()}`];
    const tauxAnneePrevious = indexes[`${previousYear}_${trimestre.toUpperCase()}`];

    if (!tauxAnneePrevious || !tauxAnneeCurrent){
      setOpenSnackbarError(true)

    } else {
      const newFixe = (numFixe * tauxAnneeCurrent) / tauxAnneePrevious
      currentAccommo.loyer.fixe = newFixe.toFixed(2)
      updateAccomodation(currentAccommo);
    }

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarError(false);
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
        <Paper elvation={0} className={classes.titleBar}>
          <Typography variant="h3" className={classes.textWhite}>
            {currentAccommo.address !== undefined && (
                <>
                  {currentAccommo.address.street} -{" "}
                  {currentAccommo.address.postalCode}{" "}
                  {currentAccommo.address.city.toUpperCase()}
                </>
            )}
          </Typography>

          <Typography variant="h4" className={classes.textWhite}>
            {currentAccommo.address !== undefined &&
            currentAccommo.address.otherInformations}
          </Typography>
        </Paper>
        <Paper elevation={0}>
          <RadioGroup
              row
              name="isCommercial"
              defaultValue="top"
              onChange={handleChange}
              className={classes.center}
          >
            <FormControlLabel
                value={"false"}
                control={
                  <Radio
                      color="secondary"
                      checked={currentAccommo.isCommercial === "false"}
                  />
                }
                label="Habitation"
                labelPlacement="end"
                disabled={!isModifying}
            />
            <FormControlLabel
                value={"true"}
                control={
                  <Radio
                      color="secondary"
                      checked={currentAccommo.isCommercial === "true"}
                  />
                }
                label="Local Commercial"
                disabled={!isModifying}
                labelPlacement="end"
            />
          </RadioGroup>

          <Grid container spacing={4} className={classes.containerTitle}>
            <Grid item className={classes.gridCell}>
              <div className={classes.containerTitle}>
                <Typography variant="h4" className={classes.titleSection}>
                  Locataire
                </Typography>
                <Typography variant="overline" className={classes.titleSection}>
                  Date d'entrée :{" "}
                  {currentAccommo.rental !== undefined
                      ? currentAccommo.rental.startDate
                      : ""}
                </Typography>
              </div>
            </Grid>
            <Grid item className={classes.gridCell}>
              <RadioGroup
                  row
                  aria-label="position"
                  name="isParticulier"
                  defaultValue="top"
                  onChange={handleChangeRental}
                  className={classes.paper}
              >
                <FormControlLabel
                    value={"true"}
                    control={
                      <Radio
                          color="secondary"
                          checked={
                            currentAccommo.rental !== undefined &&
                            currentAccommo.rental.isParticulier === "true"
                          }
                      />
                    }
                    label="Particulier"
                    disabled={!isModifying}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={"false"}
                    control={
                      <Radio
                          color="secondary"
                          checked={
                            currentAccommo.rental !== undefined &&
                            currentAccommo.rental.isParticulier === "false"
                          }
                      />
                    }
                    label="Entreprise"
                    labelPlacement="end"
                    disabled={!isModifying}
                />
              </RadioGroup>
            </Grid>
          </Grid>

          {currentAccommo.rental !== undefined &&
          currentAccommo.rental.isParticulier === "true" && (
              <Paper elevation={0} className={classes.paper}>
                <Particulier
                    disabled={isModifying}
                    currentOwner={currentAccommo}
                    handleChange={handleChangeRental}
                />
              </Paper>
          )}

          {currentAccommo.rental !== undefined &&
          currentAccommo.rental.isParticulier === "false" && (
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
                  onChange={handleChangeLoyer}
              />
            </Grid>
            {currentAccommo.loyer !== undefined && currentAccommo.loyer.activeTVA === "true" && (
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
          <div style={{marginTop: 10}}>
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
              Indice Insee de ref : {currentAccommo.loyer !== undefined && currentAccommo.loyer.indiceInsee}
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
