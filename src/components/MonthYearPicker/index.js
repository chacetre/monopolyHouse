import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Button,
  IconButton,
  Select,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
} from "@material-ui/icons";
import html2canvas from "html2canvas";
import Template from "../../views/Receipt/Template";
import jsPDF from "jspdf";

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
  currentAccomodation,
  ownerInformations,
  ...rest
}) {
  const classes = useStyles();
  const [year, setYear] = useState(2100);
  const [monthSelect, setMonth] = useState("Jan");
  const [dateReceipt, setDateReceipt] = useState({});

  function createPDF() {
    console.log("create PDF",);

    var namePDF = currentAccomodation.rental.firstname + "_" + currentAccomodation.rental.lastname + "_" + monthSelect + "_" + year + ".pdf"

    const input = document.querySelector(".divToPrint");
    if (input != null) {
      html2canvas(input).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const pdf = jsPDF("p", "mm", "a4");
        const width = 210;
        const height = 297;
        pdf.addImage(image, 0, 0, width, height);
        pdf.save(namePDF);
      });
    } else {
      console.log("isNULL");
    }
  }


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
    createPDF()
    onClose(monthSelect, year);
  };

  useEffect(() => {
    if (initialValue != undefined) {
      setYear(initialValue.split(" ")[1]);
      setMonth(initialValue.split(" ")[0].toLowerCase());
    }
  }, [initialValue]);

  useEffect(() => {
    setDateReceipt({ month: monthSelect, year: year });
  }, [monthSelect, year]);

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
              <IconButton onClick={handlePrevious}>
                <KeyboardArrowLeftRounded />
              </IconButton>
              <IconButton onClick={handleNext}>
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
                {monthSelect == row && (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleMonth("")}
                  >
                    {row}
                  </Button>
                )}
                {monthSelect != row && (
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
          <Button onClick={okClose} variant="contained">Télécharger</Button>
        </CardActions>
        <Template owner={ownerInformations} accomodation={currentAccomodation} date={dateReceipt} />
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
