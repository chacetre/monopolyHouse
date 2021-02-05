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
} from "@material-ui/core";
import { colors } from "@material-ui/core";
import CreateRounded from "@material-ui/icons/CreateRounded";
import Particulier from "./Particulier";
import Society from "./Society";
import { updateAccomodation } from "request/accomodationAPI";

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

const CardAccommodation = (accomodationInfos) => {
  const classes = useStyles();
  const [currentAccommo, setCurrentAccommo] = useState({});
  const [isModifying, setModify] = useState(false);

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

  function calculateTotal() {
    var numFixe = Number(currentAccommo.loyer.fixe);
    var numCharges = Number(currentAccommo.loyer.charges);
    var numTVA =
      currentAccommo.isCommercial !== "false"
        ? Number(currentAccommo.loyer.tva)
        : 0;

    var totalTVA = numTVA !== 0 ? (numTVA * numFixe / 100) : 0
    return numFixe + numCharges + totalTVA;
  }

  function handleModify() {
    if (isModifying) {
      updateAccomodation(currentAccommo);
    }
    setModify((prev) => !prev);
  }

  useEffect(() => {
    if (accomodationInfos !== undefined) {
      setCurrentAccommo(accomodationInfos.accomodationInfos);
    }
  }, [accomodationInfos]);

  return (
    <Paper variant="outlined" className={classes.container}>
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
            labelPlacement="right"
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
            labelPlacement="right"
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
                labelPlacement="right"
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
                labelPlacement="right"
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
      <Typography variant="overline" className={classes.titleSection}>
        Indice Insee de ref : {currentAccommo.loyer !== undefined && currentAccommo.loyer.insee}
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
          {currentAccommo.isCommercial === "true" && (
            <Grid item lg={3} md={3} xs={3}>
              <TextField
                size="small"
                label="TVA en %"
                variant="outlined"
                fullWidth
                disabled={!isModifying}
                name="tva"
                value={
                  (currentAccommo.loyer !== undefined &&
                    currentAccommo.loyer.tva) ||
                  ""
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
              value={currentAccommo.loyer !== undefined && calculateTotal()}
              disabled
              inputProps={{ "aria-label": "naked" }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <Grid container className={classes.containerTitle}>
          <Grid item md={4} xs={4}>
            <Button variant="contained" color="secondary">
              Revision de loyer
            </Button>
          </Grid>
          <Grid item md={8} xs={8} className={classes.right}>
            <Button className={classes.button}>Supprimer</Button>
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
