import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";


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
                  currentAccomodation.rental !== undefined &&
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
                  currentAccomodation.rental !== undefined &&
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
            (currentAccomodation.rental !== undefined &&
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
            (currentAccomodation.rental  &&
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
