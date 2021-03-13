import React, { useState, useEffect } from "react";
import { makeStyles} from "@material-ui/styles";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import {
  getIndexesAPI,
  updateIndexesAPI,
} from "../../../request/settingsAPI";

const trimesters = ["T1", "T2", "T3", "T4"];

const useStyles = makeStyles((theme) => ({
  root: {},
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
    marginTop: 10,
    display: "flex",
    backgroundColor: theme.palette.white,
    borderRadius : 10
  },
}));

const IndexInsee = () => {
  const classes = useStyles();
  const currentDate = new Date().toLocaleString("default", {
    year: "numeric",
  });
  const years = [
    Number(currentDate),
    Number(currentDate) - 1,
    Number(currentDate) - 2,
  ];
  const [indexes, setIndexes] = useState({});
  const [isChange, setChange] = useState(false);

  function getIndexes() {
    getIndexesAPI((response) => {
      setIndexes(response);
    });
  }

  function handleChange(event) {
    event.persist();
    setChange(true);

    setIndexes((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSave() {
    updateIndexesAPI(indexes);
    setChange(false);
  }

  useEffect(() => {
    getIndexes();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item lg={6} md={6} xs={6}>
          <Typography variant="h1">Les index INSEE</Typography>
          <Typography variant="body1">
            Ici tu peux modifier les locataires des logements ainsi qu'ajouter
            un logement via le button ajouter.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.cellRight}>
          {isChange && (
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
      <Grid container spacing={5} className={classes.white}>
        {years.map((year) => (
          <Grid item lg={4} md={4} xs={4} className={classes.title}>
            <Typography variant="h5" className={classes.titleCell}>
              {year}
            </Typography>
            <Grid container spacing={2}>
              {trimesters.map((value) => (
                <Grid item lg={3} md={3} xs={3} className={classes.title}>
                  <TextField
                    name={year + "_" + value}
                    size="small"
                    fullWidth
                    label={value}
                    value={indexes[year + "_" + value] || ""}
                    type="number"
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IndexInsee;
