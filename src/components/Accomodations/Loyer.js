import React, { useState, useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Paper,
  Grid,
  Switch,
  FormControlLabel
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(2)
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
  

const Loyer = (props) => {
  const {handleChange, currentEstate} = props;
  const classes = useStyles();
  const [currentEstateL, setCurrentEstateL] = useState({});
  const [activeTVA, setActiveTVA] = useState(false);

  function calculateTotal(){
    var numFixe = Number(currentEstateL.loyer.fixe)
    var numCharges = Number(currentEstateL.loyer.charges)
    var numTVA = activeTVA ? Number(currentEstateL.loyer.tva) : 0

    return numFixe + numCharges + numTVA
  }

  useEffect(() => {
    if (currentEstate !== undefined) setCurrentEstateL(currentEstate);
    
  }, [currentEstate]);

  return (
    <Paper elevation={0} className={classes.paper}>
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} xs={12}>
        <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                  checked={activeTVA}
                  onChange={() => setActiveTVA(prev => !prev)}
                  name="activeTVA"
                  color="primary"
              />
            }
            label="TVA : "
        />
      </Grid>
      <Grid item lg={3} md={3} xs={3}>
        <TextField
          size="small"
          label="Fixe"
          variant="outlined"
          fullWidth
          name="fixe"
            value={(currentEstateL.loyer !== undefined && currentEstateL.loyer.fixe) || ""}
          onChange={handleChange}
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
            value={currentEstateL.loyer !== undefined ? currentEstateL.loyer.tva : ""}
            onChange={handleChange}
          />
        </Grid>
      )}

      <Grid item lg={3} md={3} xs={3} className={classes.gridCell}>
        <CssTextField
          size="small"
          label="Total"
          variant="outlined"
          fullWidth
          disabled
          value={
            currentEstateL.loyer !== undefined &&
            calculateTotal()
          }
        />
      </Grid>
    </Grid>
  </Paper>
    
  );
};

Loyer.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default Loyer;