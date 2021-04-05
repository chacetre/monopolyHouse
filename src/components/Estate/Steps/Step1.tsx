import React from "react";
import {makeStyles} from "@material-ui/styles";
import {FormControl, FormControlLabel, Radio, RadioGroup,} from "@material-ui/core";
import Address from "../Address";
import {Estate} from "../../../constantes/ConstEstate";
import {convertBoolToString} from "../../Utils/converter";

const useStyles = makeStyles(() => ({
    formControl: {
        display: "flex",
        alignItems: "center",
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
            <FormControl
                component="fieldset"
                error={true}
                className={classes.formControl}
            >
                <RadioGroup
                    row
                    name="isCommercial"
                    defaultValue="top"
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value={"false"}
                        control={
                            <Radio
                                color="primary"
                                checked={convertBoolToString(currentAccommo.isCommercial)=== "false"}
                            />
                        }
                        label="Habitation"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value={"true"}
                        control={
                            <Radio
                                color="primary"
                                checked={convertBoolToString(currentAccommo.isCommercial)=== "true"}
                            />
                        }
                        label="Local Commercial"
                        labelPlacement="end"
                    />
                </RadioGroup>
            </FormControl>
            <Address
                handleChange={handleChangeAddress}
                currentAccommo={currentAccommo}
            />

        </>
    );
};

export default Step1;
