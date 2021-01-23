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
    padding: theme.spacing(2),
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

const Particulier = ({ handleChange, currentOwner, disabled, ...rest }) => {
  const [currentAccomodation, setCurrentAccomodation] = useState({});
  const [isModifying, setModify] = useState(false);

  useEffect(() => {
    if (currentOwner !== undefined) setCurrentAccomodation(currentOwner);
  }, [currentOwner]);

  useEffect(() => {
    if (disabled !== undefined) setModify(disabled);
  }, [disabled]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <RadioGroup
          row
          name="civility"
          defaultValue="top"
          onChange={handleChange}
        >
          <FormControlLabel
            value={"mr"}
            control={
              <Radio
                color="primary"
                checked={
                  currentAccomodation.rental != undefined &&
                  currentAccomodation.rental.civility === "mr"
                }
              />
            }
            label="Mr"
            labelPlacement="right"
            disabled={!isModifying}
          />
          <FormControlLabel
            value={"mme"}
            control={
              <Radio
                color="primary"
                checked={
                  currentAccomodation.rental != undefined &&
                  currentAccomodation.rental.civility === "mme"
                }
              />
            }
            label="Mme"
            labelPlacement="right"
            disabled={!isModifying}
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={5}>
        <TextField
          size="small"
          fullWidth
          label="Nom"
          name="lastname"
          onChange={handleChange}
          type="text"
          value={
            (currentAccomodation.rental != undefined &&
              currentAccomodation.rental.lastname) ||
            ""
          }
          variant="outlined"
          disabled={!isModifying}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          fullWidth
          label="Prénom"
          name="firstname"
          onChange={handleChange}
          type="text"
          value={
            (currentAccomodation.rental != undefined &&
              currentAccomodation.rental.firstname) ||
            ""
          }
          variant="outlined"
          disabled={!isModifying}
        />
      </Grid>
    </Grid>
  );
};

Particulier.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  currentOwner: PropTypes.string,
};

Particulier.defaultProps = {
  currentOwner: "bidulle",
  handleChange: () => {},
};

export default Particulier;
