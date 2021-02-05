import React from "react";
import { makeStyles} from "@material-ui/styles";
import {
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel, FormControl,
} from "@material-ui/core";
import Address from "./Address";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    imageContainer: {
        marginRight: 20,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "5px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
    },
    image: {
        width: "100%",
    },
    formControl: {
        display: "flex",
        alignItems: "center",
    },
    statsIcon: {
        color: theme.palette.icon,
        marginRight: theme.spacing(1),
    },
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
                        labelPlacement="right"
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
                        labelPlacement="right"
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
