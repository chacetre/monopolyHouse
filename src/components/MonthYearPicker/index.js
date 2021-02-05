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
  Button,
  IconButton
} from "@material-ui/core";
import {
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
  },
  centerTitle: {
    textAlign: "center",
  },
  actionBar: {
      display: "flex",
      textAlign: "right",
    justifyItems: 'right',
    alignContent: 'right',
    alignItems: 'right',
    justifyContent: 'right',
  }, expand :{
      marginLeft : "auto"
  }
}));

const month = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
];

function MonthYearPicker({
  open,
  className,
  handleChange,
  onClose,
  initialValue,
  ...rest
}) {
  const classes = useStyles();
  const [year, setYear] = useState(2100);
  const [monthSelect, setMonth] = useState("Jan");
  
  function handlePrevious() {
    setYear((year) =>  Number(year) - 1);
  }

  function handleNext() {
    setYear((year) => Number(year) + 1);
  }

  function handleMonth(value) {
    setMonth(value);
  }

  const cancelClose = () => {
    onClose();
  };

  const okClose = () => {
    onClose(monthSelect, year);
  };

  useEffect(() => {
    if (initialValue !== undefined) {
      setYear(initialValue.split(" ")[1]);
      setMonth(initialValue.split(" ")[0].toLowerCase());
    }
  }, [initialValue]);

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          title={
            <Typography variant="h3" className={classes.centerTitle}>
              {year}
            </Typography>
          }
          action={
            <>
              <IconButton size="small" onClick={handlePrevious}>
                <KeyboardArrowLeftRounded />
              </IconButton>
              <IconButton size="small" onClick={handleNext}>
                <KeyboardArrowRightRounded />
              </IconButton>
            </>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {month.map((row) => (
              <Grid item xs={3}>
                {monthSelect === row && (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleMonth("")}
                  >
                    {row}
                  </Button>
                )}
                {monthSelect !== row && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleMonth(row)}
                  >
                    {row}
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions className={classes.actionBar}>
          <Button className={classes.expand} onClick={cancelClose}>Annuler</Button>
          <Button onClick={okClose} variant="contained">Valider</Button>
        </CardActions>
      </Card>
      
    </Modal>
  );
}

MonthYearPicker.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

MonthYearPicker.defaultProps = {
  open: false,
  onClose: () => {},
};

export default MonthYearPicker;
