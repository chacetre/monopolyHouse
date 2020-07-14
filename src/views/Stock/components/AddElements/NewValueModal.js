import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  Switch,
  Button,
  FormControl,
  Select,
  FormControlLabel,
} from "@material-ui/core";
import CloseRounded from "@material-ui/icons/CloseRounded";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { saveNewValueInDataBase } from "../../../../request/stockAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: 400,
    maxHeight: "100%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  actions: {
    justifyContent: "flex-end",
  },
  toggleButton: {
    height: "100%",
  },
  div: {
    display: "flex",
  },
  center: {
    marginBottom: 20,
  },
  containerBottom: {
    marginTop: 20,
  },
}));

function NewValueModal({ open, onClose, component, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    event.persist();

    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const saveNewValues = () => {
    const scheme = {
      label: values.label,
      value: values.value,
      stock: values.stock,
    };
    saveNewValueInDataBase(
      component.name,
      component.type,
      scheme,
      component.length
    );
  };

  const cancelClose = () => {
    onClose();
  };

  const saveClose = () => {
    saveNewValues();
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title="Nouvelle valeur"
            action={
              <Button onClick={cancelClose}>
                <CloseRounded />
              </Button>
            }
          />
          <Divider />
          <CardContent>
            <TextField
              style={{ marginBottom: 15 }}
              id="outlined-select-value"
              label="Valeur"
              name="value"
              helperText="ex: twoOhm, threeNf"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              size="small"
            />

            <TextField
              style={{ marginBottom: 15 }}
              id="outlined-select-value"
              label="Label"
              name="label"
              helperText="Nom d'affichage"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              size="small"
            />

            <TextField
              fullWidth
              name="stock"
              label="Stock"
              onChange={handleChange}
              variant="outlined"
              size="small"
              type="number"
            />
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button color="primary" onClick={saveClose} variant="contained">
              Ajouter
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
}

NewValueModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

NewValueModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default NewValueModal;
