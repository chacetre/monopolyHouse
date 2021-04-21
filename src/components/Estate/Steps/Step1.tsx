import React from "react";
import {makeStyles} from "@material-ui/styles";
import {FormControl, FormControlLabel, Radio, RadioGroup,} from "@material-ui/core";
import Address from "../Address";
import {Estate, listRadioButtonStep1} from "../../../constantes/ConstEstate";
import {convertBoolToString} from "../../Utils/converter";
import CustomRadioButton, {CustomeRadioButtonValue} from "../../Utils/CustomRadioButton";

const useStyles = makeStyles(() => ({
    formControl: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

type Step1Props = {
    handleChange: (event :any) => void,
    currentAccommo: Estate,
    handleChangeAddress: (event :any) => void,
}



const Step1 = (props: Step1Props) => {
    const {handleChange, currentAccommo,handleChangeAddress} = props;
    const classes = useStyles();

    return (
        <>
            <div className={classes.formControl}>
            <CustomRadioButton
                changeFunction={handleChange}
                currentValue={currentAccommo.isCommercial}
                values={listRadioButtonStep1}
                nameRadio="isCommercial"
            />
            </div>
            <Address
                handleChange={handleChangeAddress}
                currentAccommo={currentAccommo}
            />

        </>
    );
};

export default Step1;
