import React from "react";
import {makeStyles} from "@material-ui/styles";
import {FormControl, FormControlLabel, Radio, RadioGroup, TextField,} from "@material-ui/core";
import Particulier from "../Particulier";
import Society from "../Society";
import {Estate} from "../../../constantes/ConstEstate";
import {convertBoolToString} from "../../Utils/converter";

const useStyles = makeStyles((theme :any) => ({
    root: {
        padding: theme.spacing(2)
    },
    container :{
        padding: 10
    },
    gridCell: {
        display: "flex",
        alignItems: "center",
        textAlign: "center"
    },
    startDate:{
        margin: 10
    },
    divCenter : {
        display: "flex",
        flexDirection : "row",
        alignItems: "center",
        justifyContent: "center"
    }
}));

type Step2Props = {
    handleChangeRental : (event : any) => void ,
    currentAccommo: Estate
}
const Step2 = (props: Step2Props) => {
    const {handleChangeRental, currentAccommo } = props;
    const classes = useStyles();

    return (
        <>
            <FormControl className={classes.divCenter}>
                <RadioGroup
                    row
                    name="isParticulier"
                    defaultValue="top"
                    onChange={handleChangeRental}

                >
                    <FormControlLabel
                        value={"true"}
                        control={
                            <Radio
                                color="primary"
                                checked={
                                    convertBoolToString(currentAccommo.rental.isParticulier) === "true"
                                }
                            />
                        }
                        label="Particulier"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value={"false"}
                        control={
                            <Radio
                                color="primary"
                                checked={
                                    convertBoolToString(currentAccommo.rental.isParticulier) === "false"
                                }
                            />
                        }
                        label="Entreprise"
                        labelPlacement="end"
                    />
                </RadioGroup>
                <TextField
                    size="small"
                    className={classes.startDate}
                    label="Date d'entrée"
                    name="startDate"
                    placeholder="DD/MM/YEAR"
                    onChange={handleChangeRental}
                    type="text"
                    value={currentAccommo.rental.startDate}
                    variant="outlined"
                />
            </FormControl>
            <div className={classes.container}>
                {currentAccommo.rental.isParticulier && (
                    <Particulier
                        handleChange={handleChangeRental}
                        currentOwner={currentAccommo}
                        disabled={true}
                    />
                )}
                {!currentAccommo.rental.isParticulier && (
                    <Society
                        handleChange={handleChangeRental}
                        currentEstate={currentAccommo}
                        disabled={true}
                    />
                )}
            </div>
        </>
    );
};

export default Step2;
