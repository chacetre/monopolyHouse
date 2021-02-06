import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CalendarTodayRounded, GetAppRounded } from "@material-ui/icons";
import { useOwner } from "../../context/owner";
import { getAccomodationByOwner } from "request/accomodationAPI";
import MonthYearPicker from "components/MonthYearPicker";
import TemplateGenerator from "../Settings/Components/TemplateGenerator";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  destinataire: {
    color: theme.palette.primary.main,
  },
  expediteur: {
    textAlign: "right",
  },
  page: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
  },
  pageBis: {
    backgroundColor: "#fff000",
    width: "210mm",
    height: "297mm",
    padding: 30,
  },
  divider: {
    margin: 20,
  },
  test: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    height: 30,
    width: 20,
  },
  iconDate: {
    marginLeft: 10,
  },
}));

const Receipt = () => {
  const classes = useStyles();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const { ownerInformations } = useOwner();
  const [accommodations, setData] = useState(null);
  const [currentAccomodation, setCurrentAccommodation] = useState(null);
  const [dateReceipt, setDateReceipt] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const defaultLoyerCall = 123
  const defaultQuittance = 123

  function createPDF(currentAccomodation) {
    var namePDF =
      currentAccomodation.rental.firstname +
      "_" +
      currentAccomodation.rental.lastname +
      "_" +
      dateReceipt[currentAccomodation.id]?.month || dateReceipt.default.month +
      "_" +
      dateReceipt[currentAccomodation.id].year || dateReceipt.default.year +
      ".pdf";

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

  function calculateLoyer(estate) {
    var numFixe = Number(estate.loyer.fixe);
    var numCharges = Number(estate.loyer.charges);
    var numTVA =
      estate.isCommercial === undefined ? Number(estate.loyer.tva) : 0;

    return numFixe + numCharges + numTVA;
  }

  function getAccommodationsInformations() {
    getAccomodationByOwner(ownerInformations.id, (response) => {
      setData(response);
    });
  }

  function showCalendar(currentAccomodation) {
    setShowPicker((prev) => !prev);
    setCurrentAccommodation(currentAccomodation);
  }

  useEffect(() => {
    getAccommodationsInformations();
  }, []);

  useEffect(() => {
    if (currentDate !== undefined) {
      var splitDate = currentDate.split(" ");
      setDateReceipt((prev) => ({
        ...prev,
        default: {
          month: splitDate[0],
          year: splitDate[1],
        },
      }));
    }
  }, [currentDate]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h2">
          EDITION DES QUITTANCES ET APPELS DE LOYER
        </Typography>
        <Typography variant="overline">
          Date actuelle:{" "}
          {currentDate.toLocaleString("default", { month: "long" })}
        </Typography>
      </div>

      <MonthYearPicker
        open={showPicker}
        initialValue={currentDate.toLocaleString("default", { month: "long" })}
        currentAccomodation={currentAccomodation}
        ownerInformations={ownerInformations}
        onClose={(monthReturn, yearReturn) => {
          setDateReceipt((formState) => ({
            ...formState,
            [currentAccomodation.id]: {
              month: monthReturn,
              year: yearReturn,
            },
          }));
          setShowPicker(false);
        }}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Logements</TableCell>
              <TableCell>Locataire</TableCell>
              <TableCell>Montant du loyer</TableCell>
              <TableCell>Appel de loyer</TableCell>
              <TableCell>Quittance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accommodations &&
              Object.values(accommodations).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <div>{row.address.street.toUpperCase()}</div>
                    <div>{row.address.otherInformations}</div>
                    <div>{row.address.city.toUpperCase()}</div>
                  </TableCell>
                  <TableCell>
                    {row.rental.isParticulier !== "false"
                      ? row.rental.civility.toUpperCase() +
                        " " +
                        row.rental.firstname.toUpperCase() +
                        " " +
                        row.rental.lastname.toUpperCase()
                      : row.rental.socialIdentity}
                  </TableCell>
                  <TableCell>{calculateLoyer(row)} €</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => showCalendar(row)}
                    >
                      {dateReceipt[row.id]?.month || dateReceipt.default.month}{" "}
                      {dateReceipt[row.id]?.year || dateReceipt.default.year}
                      <CalendarTodayRounded className={classes.iconDate} />
                    </Button>
                    <TemplateGenerator
                      owner={ownerInformations}
                      accomodation={row}
                      date={dateReceipt[row.id] || dateReceipt.default}
                      template={row.templates?.loyerCall || defaultLoyerCall}
                      display={false}
                      toPrint
                      type="id"
                    />
                    <Button
                      variant="contained"
                      className={classes.icon}
                      onClick={() => createPDF(row)}
                    >
                      <GetAppRounded />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => showCalendar(row)}
                    >
                      {dateReceipt.month} {dateReceipt.year}{" "}
                      <CalendarTodayRounded className={classes.iconDate} />
                    </Button>
                    <TemplateGenerator
                      owner={ownerInformations}
                      accomodation={row}
                      date={dateReceipt[row.id] || dateReceipt.default}
                      template={row.templates?.quittance || defaultQuittance}
                      display={false}
                      toPrint
                      type="id"
                    />
                    <Button variant="contained" className={classes.icon}>
                      <GetAppRounded />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Receipt;
