import React from "react";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme :any) => ({
    datePicker : {
        borderColor : theme.palette.gray,
        borderRadius : 5,
        padding : 5,
        borderStyle : "solid",
        borderWidth: 1,
        fontFamily : "sans-serif"
    }
}));


type InputDateProps = {
    changeFunction: (event :any) => void,
    currentValue: string,
    type: string,
    name: string,
    max? : string,
    min? : string,
    className?: string
}

const InputDate = (props : InputDateProps) => {
    const {changeFunction, currentValue, name, max = "", min = "2000-01-01", type, className } = props;
    const classes = useStyles();

    return (
        <input
            className={clsx(classes.datePicker, className)}
            name={name}
            type={type}
            min={min}
            max={max}
            value={currentValue}
            onChange={changeFunction}
        />)
};



export default InputDate;
