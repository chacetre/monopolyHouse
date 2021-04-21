import React from "react";
import {makeStyles} from "@material-ui/styles";
import {FormControl, FormControlLabel, Radio, RadioGroup, TextField,} from "@material-ui/core";
import Particulier from "../Particulier";
import Society from "../Society";
import {Estate, listRadioButtonStep2} from "../../../constantes/ConstEstate";
import {convertBoolToString} from "../../Utils/converter";
import CustomRadioButton, {CustomeRadioButtonValue} from "../../Utils/CustomRadioButton";

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
                <CustomRadioButton
                    changeFunction={handleChangeRental}
                    currentValue={currentAccommo.rental.isParticulier}
                    values={listRadioButtonStep2}
                    nameRadio="isParticulier"
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
