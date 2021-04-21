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
import {GetAppRounded} from "@material-ui/icons";
import {useOwner} from "../../context/owner";
import {getAccomodationByOwner} from "../../api/accomodationAPI";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {generateName, MyDocument} from "../../components/Utils/FileUtils";
import {calculateTotal} from "../../components/Utils/calculs";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {getTemplatesAPI, getTemplatesDefaultAPI} from "../../api/settingsAPI";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    height: "100%"
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    textAlign: "center",
    backgroundColor: theme.palette.action.main,
    padding: 5,
    marginLeft: 10,
    color: theme.palette.action.contrastText,
    width: 60,
    border: "solid",
    borderRadius: 10
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
  datePicker : {
    borderColor : theme.palette.gray,
    borderRadius : 5,
    padding : 5,
    borderStyle : "solid",
    borderWidth: 1,
    fontFamily : "sans-serif"
  }
}));



const Receipts = () => {
  const classes = useStyles();
  const currentDate = new Date().toLocaleString("default", {
    month: "numeric",
    year: "numeric",
  });
  const { ownerInformations } = useOwner();
  const [accommodations, setData] = useState(null);
  const [dateReceipt, setDateReceipt] = useState({});
  const [fileSelected, setFileSelected] = useState({})
  const [templates, setTemplates] = useState({})

  const handleSelectFile = (event, id) => {
    event.persist()
    setFileSelected((formState) => ({
      ...formState,
      [id]: event.target.value
    }));
  }

  function getAccommodationsInformations() {
    getAccomodationByOwner(ownerInformations.id, (response) => {
      setData(response);
    });
  }

  function getTemplates(){
    getTemplatesAPI((response) => {
      if (response !== null){
        setTemplates(response);
      } else {
        getTemplatesDefaultAPI((responseDefault) => {
          setTemplates(responseDefault);
        });
      }
    });
  }

  function getSelectedTemplate(row){
    const typeTemplate = fileSelected[row.id] || "quittance"
    if (templates !== undefined){
      return Object.values(templates).find((template) => template.isParticulier === row.rental.isParticulier && template.type === typeTemplate)
    } else {
      return {}
    }
  }

 function displayDatePicker(row) {

    if (dateReceipt[row.id]){
      return dateReceipt[row.id]?.year + "-" + dateReceipt[row.id]?.month
    } else {
      return dateReceipt.default.year + "-" + dateReceipt.default.month
    }
 }

  function handleMonthPicker(event, currentAccomodation) {
    console.log("event", event.target.value)

    const parcingDate = event.target.value.split("-")

    setDateReceipt((formState) => ({
      ...formState,
      [currentAccomodation.id]: {
        month: parcingDate[1],
        year: parcingDate[0],
      },
    }));
  }

  useEffect(() => {
    getAccommodationsInformations();
    getTemplates();
  }, []);

  useEffect(() => {
    if (currentDate !== undefined) {
      var splitDate = currentDate.split("/");
      setDateReceipt((prev) => ({
        ...prev,
        default: {
          month: splitDate[0],
          year: splitDate[1],
        },
      }));
    }
  }, [currentDate]);

  useEffect(() => {

  }, [templates]);

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
                      {row.rental.isParticulier !== false
                          ? row.rental.civility.toUpperCase() +
                          " " +
                          row.rental.lastname.toUpperCase() +
                          " " +
                          row.rental.firstname.toUpperCase()
                          : row.rental.socialIdentity}
                    </TableCell>
                    <TableCell>{calculateTotal(row.loyer)} €</TableCell>
                    <TableCell>
                      <div className={classes.center}>
                        <input
                            className={classes.datePicker}
                            type="month"
                            min="2000-01"
                            value={displayDatePicker(row)}
                            required pattern="[0-9]{4}-[0-9]{2}}"
                            onChange={(event) => handleMonthPicker(event, row)}
                        />
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
                        <PDFDownloadLink
                            document={<MyDocument
                                owner={ownerInformations}
                                accomodation={row}
                                date={dateReceipt[row.id] || dateReceipt.default}
                                textsTemplate={getSelectedTemplate(row)}
                            />}
                            fileName={generateName(row,dateReceipt) || "null"}
                            className={classes.icon}
                        >
                          {({loading}) =>
                              loading ? "Loading document..." :  <GetAppRounded />
                          }
                        </PDFDownloadLink>
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
