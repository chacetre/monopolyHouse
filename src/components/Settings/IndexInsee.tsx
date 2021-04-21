import React, { useState, useEffect } from "react";
import { makeStyles, withStyles} from "@material-ui/styles";
import {
  Typography,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell, TableBody, Paper
} from "@material-ui/core";
import {
  getIndexesParticularAPI,
  getIndexesSocietyAPI,
  updateIndexesParticularAPI, updateIndexesSocietyAPI,
} from "../../api/settingsAPI";

const trimesters = ["T1", "T2", "T3", "T4"];

const InvisibleTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme : any) => ({
  root: {
    width: '100%',
  },
  button: {
    marginBottom: 30,
  },
  titleCell: {
    marginBottom: 10,
  },
  cellRight: {
    textAlign: "right",
    paddingRight: 25,
  },
  white: {
    maxHeight: "30vh",
    marginTop: 10,
    padding:10,
    display: "flex",
    backgroundColor: theme.palette.white,
    borderRadius : 10
  },
  center : {
    marginTop: 10,
    padding: 5,
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: theme.palette.secondary.dark,
    borderRadius : 5
  },
  grid : {
    height: "40vh"
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main
  }
}));

const IndexInsee = () => {
  const classes = useStyles();
  const currentDate : string = new Date().toLocaleString("default", {
    year: "numeric",
  });

  const [indexes, setIndexes] = useState<any>({});
  const [indexesSociety, setIndexesSociety] = useState<any>({});
  const [isChange, setChange] = useState<boolean>(false);
  const [isChangeSociety, setChangeSociety] = useState<boolean>(false);

  function generateYearTable(currentDateLocal: number) {
    const newTable : number[] = []
    let currentYear = currentDateLocal
    do {
       newTable.push(currentYear)
       currentYear = currentYear -  1

    } while (currentYear >= 2000)

    return newTable
  }

  function getIndexes() {
    getIndexesParticularAPI((response : any) => {
      console.log("indexes received", response)
      if (response !== null) {
        setIndexes(response);
      }
    });
  }

  function getIndexesSociety() {
    getIndexesSocietyAPI((response : any) => {
      if (response !== null){
        setIndexesSociety(response);
      }

    });
  }

  function handleChange(event : any) {
    event.persist();
    setChange(true);

    setIndexes((prev : any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleChangeSociety(event : any) {
    event.persist();
    setChangeSociety(true);

    setIndexesSociety((prev : any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSave() {

    if (isChange){
      updateIndexesParticularAPI(indexes);
    }
    if (isChangeSociety){
      updateIndexesSocietyAPI(indexesSociety)
    }

    setChange(false);
    setChangeSociety(false);
  }

  useEffect(() => {
    getIndexes();
    getIndexesSociety();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item lg={6} md={6} xs={6}>
          <Typography variant="h1">Les index INSEE</Typography>
          <Typography variant="body1">
            Ici tu peux modifier les index INSEE des particuliers ou entreprises.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.cellRight}>
          {(isChange || isChangeSociety) && (
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleSave}
            >
              Sauvegarder
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={5} >
        <Grid item lg={6} md={6} xs={6}  className={classes.grid}>
          <Typography variant="h3" className={classes.center}>Particulier</Typography>
          <TableContainer className={classes.white}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Année</TableCell>
                  <TableCell align="right">T1</TableCell>
                  <TableCell align="right">T2</TableCell>
                  <TableCell align="right">T3</TableCell>
                  <TableCell align="right">T4</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateYearTable(Number(currentDate)).map((year) => (
                    <TableRow key={year} tabIndex={-1}>
                      <TableCell component="th" scope="row">
                        {year}
                      </TableCell>
                      {trimesters.map((value,index) => (
                          <TableCell component="th" scope="row" key={index}>
                            <InvisibleTextField
                                name={year + "_" + value}
                                size="small"
                                margin="dense"
                                fullWidth
                                value={ indexes[year + "_" + value]}
                                type="number"
                                onChange={handleChange}
                                variant="outlined"
                                defaultValue={0}
                                inputProps={{
                                  style: { textAlign: "right" , paddingRight: 5}
                                }}
                            />
                          </TableCell>
                      ))}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item lg={6} md={6} xs={6} className={classes.grid}>
          <Typography variant="h3" className={classes.center}>Entreprise</Typography>
          <TableContainer className={classes.white} >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Année</TableCell>
                  <TableCell align="right">T1</TableCell>
                  <TableCell align="right">T2</TableCell>
                  <TableCell align="right">T3</TableCell>
                  <TableCell align="right">T4</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateYearTable(Number(currentDate)).map((year) => (
                    <TableRow key={year}>
                      <TableCell component="th" scope="row">
                        {year}
                      </TableCell>
                      {trimesters.map((value, index) => (
                          <TableCell component="th" scope="row" key={1000 +index}>
                            <InvisibleTextField
                                name={year + "_" + value}
                                size="small"
                                margin="dense"
                                fullWidth
                                value={indexesSociety[year + "_" + value] || 0}
                                type="number"
                                onChange={handleChangeSociety}
                                variant="outlined"
                                defaultValue={0}
                                inputProps={{
                                  style: { textAlign: "right", paddingRight: 5 }
                                }}
                            />
                          </TableCell>
                      ))}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default IndexInsee;
