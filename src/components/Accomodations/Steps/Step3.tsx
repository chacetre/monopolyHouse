import React from "react";
import {TextField,} from "@material-ui/core";
import Loyer from "../Loyer";
import {Estate} from "../../../constantes/LoyerC";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme : any) => ({
    indiceInsee:{
        marginBottom: 10
    }
}));

type Step3Props =  {
    handleChange : (event: any) => void,
    currentAccommo: Estate
}
const Step3 = (props : Step3Props) => {
    const { handleChange, currentAccommo} = props
    const classes = useStyles();

    return (
        <>
            <TextField
                size="small"
                fullWidth
                className={classes.indiceInsee}
                helperText="Doit etre sous la forme : T1, T2, T3, T4"
                label="Indice Insee de référence"
                name="indiceInsee"
                onChange={handleChange}
                type="text"
                value={
                    ((currentAccommo.loyer.indiceInsee) || "")
                }
                variant="outlined"
            />
            <Loyer
                handleChange={handleChange}
                currentEstate={currentAccommo}
            />
        </>
    );
};

export default Step3;
