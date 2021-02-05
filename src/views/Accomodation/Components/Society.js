import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField
} from "@material-ui/core";


const Society = (props) => {
  const { disabled, handleChange, currentEstate } = props;
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
          value={currentEstateL.rental !== undefined && (currentEstateL.rental.socialIdentity || "")}
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
