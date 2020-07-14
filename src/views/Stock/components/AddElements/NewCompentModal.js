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
import {
  saveNewComponentInDataBase,
  saveNewSousTypeInDataBase,
} from "../../../../request/stockAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: 700,
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

function NewCompentModal({ open, onClose, component, className, ...rest }) {
  const classes = useStyles();
  const [nameElement, setNameElement] = useState("");

  const handleChange = (event) => {
    event.persist();
    setNameElement(event.target.value);
  };

  const cancelClose = () => {
    onClose();
  };

  const saveClose = () => {
    saveNewComponentInDataBase(nameElement, component.length);
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
            title="Nouveau composant"
            action={
              <Button onClick={cancelClose}>
                <CloseRounded />
              </Button>
            }
          />
          <Divider />
          <CardContent>
            <TextField
              label="Nom"
              onChange={handleChange}
              variant="outlined"
              fullWidth
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

NewCompentModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

NewCompentModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default NewCompentModal;
