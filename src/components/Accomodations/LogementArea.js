import React from "react";
import { makeStyles} from "@material-ui/styles";
import {
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel, FormControl,
} from "@material-ui/core";
import Address from "./Address";
import {Field, Form, Formik} from "formik";

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: "flex",
        alignItems: "center",
    }
}));


const LogementArea = (props) => {
    const {handleChange, currentAccommo,hasError,handleChangeAddress} = props;
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
                    className={classes.gridCell}
                >
                    <FormControlLabel
                        value={"false"}
                        control={
                            <Radio
                                color="primary"
                                checked={currentAccommo.values.isCommercial === "false"}
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
                                checked={currentAccommo.values.isCommercial === "true"}
                            />
                        }
                        label="Local Commercial"
                        labelPlacement="end"
                    />
                </RadioGroup>
                {hasError("isCommercial") ? (
                    <Typography>currentAccommo.errors.isCommercial[0]</Typography>
                ) : null}
            </FormControl>
            <Address
                handleChange={handleChangeAddress}
                currentAccommo={currentAccommo}
            />

        </>
    );
};

export default LogementArea;
