import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FormControlLabel, Grid, Radio, RadioGroup, TextField,} from "@material-ui/core";
import {Estate, initialValueEstate, listCivility, listRadioButtonStep2} from "../../constantes/ConstEstate";
import CustomRadioButton from "../Utils/CustomRadioButton";

type ParticulierProps = {
    handleChange : (event: any) => void,
    currentOwner : Estate,
    disabled : boolean
}

const Particulier = (props : ParticulierProps) => {
    const { handleChange, currentOwner, disabled, ...rest } = props
    const [currentAccomodation, setCurrentAccomodation] = useState<Estate>(initialValueEstate);
    const [isModifying, setModify] = useState(false);

    useEffect(() => {
        if (currentOwner !== undefined) setCurrentAccomodation(currentOwner);
    }, [currentOwner]);

    useEffect(() => {
        if (disabled !== undefined) setModify(disabled);
    }, [disabled]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <CustomRadioButton
                    changeFunction={handleChange}
                    currentValue={currentAccomodation.rental.civility || "mr"}
                    values={listCivility}
                    nameRadio="civility"
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    size="small"
                    fullWidth
                    label="Nom"
                    name="lastname"
                    onChange={handleChange}
                    type="text"
                    value={
                        (currentAccomodation.rental !== undefined &&
                            currentAccomodation.rental.lastname) ||
                        ""
                    }
                    variant="outlined"
                    disabled={!isModifying}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Prénom"
                    name="firstname"
                    onChange={handleChange}
                    type="text"
                    value={
                        (currentAccomodation.rental  &&
                            currentAccomodation.rental.firstname) ||
                        ""
                    }
                    variant="outlined"
                    disabled={!isModifying}
                />
            </Grid>
        </Grid>
    );
};

Particulier.propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func,
    currentOwner: PropTypes.object,
};

Particulier.defaultProps = {
    handleChange: () => {},
};

export default Particulier;
