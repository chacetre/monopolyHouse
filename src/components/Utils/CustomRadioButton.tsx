import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel, IconButton, Typography,
} from "@material-ui/core";
import { useOwner } from "../../context/owner";
import { updateOwner } from "../../api/ownerAPI";
import {OwnerInformations, initialsValuesAccount} from "../../constantes/ConstAccount";
import {Estate} from "../../constantes/ConstEstate";
import {RadioButtonCheckedRounded, RadioButtonUncheckedRounded} from "@material-ui/icons";

const useStyles = makeStyles((theme :any) => ({
    div : {
        display: "flex",
        flexDirection : "row",
        alignItems: "center"
    }
}));

export type CustomeRadioButtonValue = {
    label: string,
    key: string | boolean | number
}

type CustomRadioButtonProps = {
    changeFunction: (event :any) => void,
    currentValue: string | boolean | number,
    values: CustomeRadioButtonValue[],
    nameRadio: string
}

const CustomRadioButton = (props : CustomRadioButtonProps) => {
    const {changeFunction, currentValue, values, nameRadio } = props;
    const classes = useStyles();

    return (
        <div className={classes.div}>
        {values.map((value => (
            <div style={{display: "flex",
                flexDirection : "row",
                alignItems: "center"}}>
            <IconButton
                onClick={(event) => changeFunction({...event,target : {value : value.key, name : nameRadio}})}
            color="primary"
            >
                {value.key === currentValue ? <RadioButtonCheckedRounded/> : <RadioButtonUncheckedRounded/>}
            </IconButton>
            <Typography variant="body1">{value.label}</Typography>
        </div>
        )))}
    </div>)
};



export default CustomRadioButton;
