import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/styles";
import {FormControlLabel, Grid, Paper, Switch, TextField, Typography} from "@material-ui/core";
import {calculateTotal, calculTVA} from "../Utils/calculs";
import {Estate, initialValueEstate} from "../../constantes/ConstEstate";

const useStyles = makeStyles((theme : any) => ({
  root: {
    padding: theme.spacing(2)
  },
  title : {
    display : "flex",
    alignItems: "center",
    justifyItems: "center"
  }
}));

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

type LoyerProps = {
  currentEstate : Estate,
  handleChange : (event : any) => void
}

const Loyer = (props : LoyerProps) => {
  const classes = useStyles();
  const {handleChange, currentEstate} = props;
  const [currentEstateL, setCurrentEstateL] = useState<Estate>(initialValueEstate);
  const [activeTVA, setActiveTVA] = useState<boolean>(false);

  useEffect(() => {
    if (currentEstate !== undefined) setCurrentEstateL(currentEstate);
  }, [currentEstate]);

  return (
      <Paper elevation={0}>
        <div className={classes.title}>
          <Typography variant="h4" >Loyer</Typography>
          <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                    value={!activeTVA}
                    checked={activeTVA}
                    onChange={(event) => {
                      handleChange(event)
                      setActiveTVA(prev => !prev)
                    }}
                    name="activeTVA"
                    color="primary"
                />
              }
              label="TVA : "
          />
        </div>

        <Grid container spacing={2}>
          <Grid item lg={3} md={3} xs={3}>
            <TextField
                size="small"
                label="Fixe"
                variant="outlined"
                fullWidth
                name="fixe"
                value={(currentEstateL.loyer !== undefined && currentEstateL.loyer.fixe) || ""}
                onChange={handleChange}
                type="number"
            />
          </Grid>

          <Grid item lg={3} md={3} xs={3}>
            <TextField
                size="small"
                label="Charges"
                variant="outlined"
                fullWidth
                name="charges"
                value={(currentEstateL.loyer !== undefined && currentEstateL.loyer.charges) || ""}
                onChange={handleChange}
                type="number"
            />
          </Grid>
          {activeTVA && (
              <Grid item lg={3} md={3} xs={3}>
                <TextField
                    size="small"
                    label="TVA en %"
                    variant="outlined"
                    fullWidth
                    name="tva"
                    value={currentEstateL.loyer !== undefined && calculTVA(currentEstateL.loyer)}
                    InputProps={{
                      readOnly: true,
                    }}
                />
              </Grid>
          )}

          <Grid item lg={3} md={3} xs={3}>
            <CssTextField
                size="small"
                label="Total"
                variant="outlined"
                fullWidth
                disabled
                value={
                  currentEstateL.loyer !== undefined &&
                  calculateTotal(currentEstateL.loyer)
                }
                InputProps={{
                  readOnly: true,
                }}
            />
          </Grid>
        </Grid>
      </Paper>

  );
};

export default Loyer;
