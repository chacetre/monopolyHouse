import React, { useState, useEffect} from "react";

import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(2)
  },
  imageContainer: {
    marginRight: 20,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
  },
  image: {
    width: "100%",
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
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
  const {handleChange, currentEstate, ...rest } = props;
  const classes = useStyles();
  const [currentEstateL, setCurrentEstateL] = useState({});
  
  function calculateTotal(){

    var numFixe = Number(currentEstateL.loyer.fixe)
    var numCharges = Number(currentEstateL.loyer.charges)
    var numTVA = currentEstateL.isCommercial != undefined ? Number(currentEstateL.loyer.tva) : 0

    return numFixe + numCharges + numTVA
  }

  useEffect(() => {
    if (currentEstate !== undefined) setCurrentEstateL(currentEstate);
    
  }, [currentEstate]);

  return (
    
      
    <Paper elevation={0} className={classes.paper}>
    <Grid container spacing={2}>
      <Grid item lg={3} md={3} xs={3}>
        <TextField
          size="small"
          label="Fixe"
          variant="outlined"
          fullWidth
          name="fixe"
            value={ currentEstateL.loyer != undefined && currentEstateL.loyer.fixe || ""}
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
            value={currentEstateL.loyer != undefined && currentEstateL.loyer.charges || ""}
          onChange={handleChange}
        />
      </Grid>
      {currentEstateL.isCommercial == "true" && (
        <Grid item lg={3} md={3} xs={3}>
          <TextField
            size="small"
            label="TVA en %"
            variant="outlined"
            fullWidth
            name="tva"
            value={currentEstateL.loyer != undefined && currentEstateL.loyer.tva || ""}
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
            currentEstateL.loyer != undefined &&
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
