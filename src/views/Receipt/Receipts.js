import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {Button, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {CalendarTodayRounded, GetAppRounded} from "@material-ui/icons";
import {useOwner} from "../../context/owner";
import {getAccomodationByOwner} from "request/accomodationAPI";
import MonthYearPicker from "components/MonthYearPicker";
import TemplateGenerator from "../Settings/Components/TemplateGenerator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {createPDF} from "./FileUtils";
import {calculateTotal} from "../../components/Utils/calculs";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginLeft: 10,
    height: 30,
    width: 20,
  },
  iconDate: {
    marginLeft: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 32
  },
  center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    maxHeight: "75%"
  },
}));



const Receipts = () => {
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
  const [fileSelected, setFileSelected] = useState({})

  const handleSelectFile = (event, id) => {
    event.persist()
    setFileSelected((formState) => ({
      ...formState,
      [id]: event.target.value
    }));
  }

  const handleDownload = (event, accomodation) => {
    const input = document.querySelector(`.divToPrint${accomodation.id}`);
    createPDF(accomodation, dateReceipt, fileSelected, input)
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

  // TODO CHANGE
  React.useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => document.body.style.overflow = "scroll"
  }, []);


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

        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Logements</TableCell>
                <TableCell>Locataire</TableCell>
                <TableCell>Montant du loyer</TableCell>
                <TableCell/>
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
                    <TableCell>{calculateTotal(row.loyer)} €</TableCell>
                    <TableCell>
                      <div className={classes.center}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => showCalendar(row)}
                        >
                          {dateReceipt[row.id]?.month || dateReceipt.default.month}{" "}
                          {dateReceipt[row.id]?.year || dateReceipt.default.year}
                          <CalendarTodayRounded className={classes.iconDate} />
                        </Button>
                        <FormControl variant="outlined" >
                          <Select
                              value={fileSelected[row.id] || "quittance"}
                              onChange={(event) => handleSelectFile(event, row.id)}
                              className={classes.formControl}
                          >
                            <MenuItem value="quittance">Quittance</MenuItem>
                            <MenuItem value="moneyCall">Appel de loyer</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            className={classes.icon}
                            onClick={(event) => handleDownload(event,row)}
                        >
                          <GetAppRounded />
                        </Button>
                        <TemplateGenerator
                            owner={ownerInformations}
                            accomodation={row}
                            date={dateReceipt[row.id] || dateReceipt.default}
                            template={fileSelected[row.id] || "quittance"}
                            display={false}
                            toPrint
                            type="id"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default Receipts;
