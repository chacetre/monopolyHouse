import React, {useEffect, useState} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography,} from "@material-ui/core";
import Loyer from "../Loyer";
import {Estate} from "../../../constantes/ConstEstate";
import {makeStyles} from "@material-ui/styles";
import {recurrenceLoyer, schema, schemaAddress, schemaLoyer, schemaRental} from "../../../constantes/ConstEstateModal";
import validate from "validate.js";
import InputDate from "../../Utils/InputDate";
import SelectRecurrence from "../../Utils/SelectRecurrence";

const useStyles = makeStyles((theme : any) => ({
    indiceInsee:{
        marginBottom: 5
    },
    container: {
        marginTop: 10,
        marginBottom: 20

    },
    selectRecurrence: {
        width: "50%"
    }
}));

type Step3Props =  {
    handleChange : (event: any) => void,
    currentAccommo: Estate
}
const Step3 = (props : Step3Props) => {
    const { handleChange, currentAccommo} = props
    const classes = useStyles();
    const [defaultValueRecurrence, setDefaultValueRecurrence] = useState<number>(1)

    useEffect(() => {
        currentAccommo.rental.isParticulier ? setDefaultValueRecurrence(1) : setDefaultValueRecurrence(3)
    }, [currentAccommo]);

    return (
        <div>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.indiceInsee}>Indice Insee</Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                            size="small"
                            helperText="Doit etre sous la forme : T1, T2, T3, T4"
                            label="Trimestre"
                            name="indiceInsee"
                            onChange={handleChange}
                            type="text"
                            value={
                                ((currentAccommo.loyer.indiceInsee) || "")
                            }
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <InputDate changeFunction={handleChange} currentValue={currentAccommo.loyer.startDate} type="date" name="startDate"/>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.container}>
                <Loyer
                    handleChange={handleChange}
                    currentEstate={currentAccommo}
                />
            </div>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.indiceInsee}>Récurrence du loyer</Typography>
                <SelectRecurrence
                    changeFunction={handleChange}
                    currentValue={currentAccommo.loyer.recurrence || defaultValueRecurrence}
                    className={classes.selectRecurrence}
                label={false}/>
            </div>
        </div>
    );
};

export default Step3;
