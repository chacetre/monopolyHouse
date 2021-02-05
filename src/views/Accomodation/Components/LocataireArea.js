import React, { useState, useEffect} from "react";

import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    TextField,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel, FormControl,
} from "@material-ui/core";
import Particulier from "./Particulier";
import Society from "./Society";



const useStyles = makeStyles((theme) => ({
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
    }
}));


const LocataireArea = (props) => {
    const {handleChange, handleChangeRental, currentAccommo,hasError, ...rest } = props;
    const classes = useStyles();

    return (
        <>
            <FormControl className={classes.gridCell}>
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
                                    currentAccommo.values.rental.isParticulier === "true"
                                }
                            />
                        }
                        label="Particulier"
                        labelPlacement="right"
                    />
                    <FormControlLabel
                        value={"false"}
                        control={
                            <Radio
                                color="primary"
                                checked={
                                    currentAccommo.values.rental.isParticulier === "false"
                                }
                            />
                        }
                        label="Entreprise"
                        labelPlacement="right"
                    />
                    <FormControlLabel
                        value={"null"}
                        control={
                            <Radio
                                color="primary"
                                checked={
                                    currentAccommo.values.rental.isParticulier === "null"
                                }
                            />
                        }
                        label="Vide"
                        labelPlacement="right"
                    />
                </RadioGroup>

                <TextField
                    size="small"
                    className={classes.startDate}
                    error={hasError("startDate")}
                    helperText={
                        hasError("startDate") ? currentAccommo.errors.startDate[0] : null
                    }
                    label="Date d'entrée"
                    name="startDate"
                    onChange={handleChangeRental}
                    type="text"
                    value={
                        ((currentAccommo.values.rental.startDate) || "")
                    }
                    variant="outlined"
                />
            </FormControl>
            <div className={classes.container}>
                {currentAccommo.values.rental.isParticulier === "true" && (
                    <Particulier
                        handleChange={handleChangeRental}
                        currentOwner={currentAccommo.values}
                        disabled={true}
                    />
                )}
                {currentAccommo.values.rental.isParticulier === "false" && (
                    <Society
                        handleChange={handleChangeRental}
                        currentEstate={currentAccommo.values}
                        disabled={true}
                    />
                )}
            </div>
        </>
    );
};

export default LocataireArea;