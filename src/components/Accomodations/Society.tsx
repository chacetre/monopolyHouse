import React, {useEffect, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import {Estate, initialValueEstate} from "../../constantes/LoyerC";


type SocietyProps = {
  handleChange : (event: any) => void,
  currentEstate : Estate,
  disabled : boolean
}

const Society = (props : SocietyProps) => {
  const { disabled, handleChange, currentEstate } = props;
  const [currentEstateL, setCurrentEstateL] = useState<Estate>(initialValueEstate);
  const [isModifying, setModify] =useState<boolean>(false);

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

export default Society;
