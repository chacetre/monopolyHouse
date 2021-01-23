import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
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

const Society = (props) => {
  const { className, disabled, handleChange, currentEstate, ...rest } = props;
  const classes = useStyles();
  const [currentEstateL, setCurrentEstateL] = useState({});
  const [isModifying, setModify] =useState(false);


  useEffect(() => {
    if (disabled !== undefined) setModify(disabled);
    
  }, [disabled]);

  useEffect(() => {
    if (currentEstate !== undefined) setCurrentEstateL(currentEstate);
    
  }, [currentEstate]);

  return (
    
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField size="small"
          fullWidth
          label="Raison Social"
          name="socialIdentity"
          onChange={handleChange}
          type="text"
          value={currentEstateL.rental != undefined && currentEstateL.rental.socialIdentity || ""}
          variant="outlined"
          disabled={!isModifying}/>
        </Grid>
      </Grid>
    
  );
};

Society.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default Society;
