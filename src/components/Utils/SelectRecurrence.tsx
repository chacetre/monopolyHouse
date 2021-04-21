import React from "react";
import {recurrenceLoyer} from "../../constantes/ConstEstateModal";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

type InputDateProps = {
    changeFunction: (event :any) => void,
    currentValue: number,
    className? : string
    fullWidth? : boolean,
    label?: boolean
}

const SelectRecurrence = (props : InputDateProps) => {
    const {changeFunction, currentValue, className ="" , fullWidth = false, label=true} = props;

    return (
        <FormControl variant="outlined" className={className} size="small" fullWidth={fullWidth
        }>
            {label && <InputLabel id="demo-simple-select-outlined-label">Récurrence</InputLabel>}
            <Select
                value={currentValue}
                onChange={changeFunction}
                variant="outlined"
                name="recurrence"
                label={label ? "Récurrence" : null }
            >
                {recurrenceLoyer.map((recurrence) => (
                    <MenuItem value={recurrence.value}>
                        {recurrence.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>)
};



export default SelectRecurrence;
