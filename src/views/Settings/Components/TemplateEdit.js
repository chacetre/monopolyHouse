import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import { func } from "prop-types";
import {
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { getTemplateByIdAPI, updateTemplateAPI } from "request/settingsAPI";
import { useParams } from "react-router-dom";
import { InfoRounded, Report } from "@material-ui/icons";
import {
  fakeAccomodation,
  fakeDate,
  fakeOwner,
} from "../../../components/Constants/const";
import TemplateGenerator from "./TemplateGenerator";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6)
  },
  container : {
marginBottom : 10
  },
  button: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 10,
  },
  cellCenter: {
    display: "flex",
    alignItems: "center",
  },
  cellRight: {
    textAlign: "right",
  },
  boxPreview: {
    backgroundColor: theme.palette.white,
  },
}));

const matching = [
  "Nom du locataire : [name_rental]",
  "Civilité du locataire : [civility]",
  "Adresse complete : [complete_address]",
  "Ville du logement : [city]",
];

const whom = {
  all: {
    value: "all",
    label: "Tous le monde",
  },
  particular: {
    value: "particular",
    label: "Particulier",
  },
  society: {
    value: "society",
    label: "Entreprise",
  },
};

const type = {
  quittance: {
    value: "quittance",
    label: "Quittance",
  },
  moneyCall: {
    value: "moneyCall",
    label: "Appel de loyer",
  },
};

const TemplateEdit = () => {
  const classes = useStyles();
  let history = useHistory();
  let { idTemplate } = useParams();
  const [template, setTemplate] = useState({});

  function getTemplate() {
    console.log("idTemplate", idTemplate);
    getTemplateByIdAPI(idTemplate, (response) => {
      console.log("response", response);
      setTemplate(response);
    });
  }

  function handleChange(event) {
    event.persist();

    setTemplate((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function saveChange() {
    updateTemplateAPI(idTemplate, template);
    history.goBack();
  }

  useEffect(() => {

    if (idTemplate !== "new")
    getTemplate();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={10} className={classes.container}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="subtitle1">
            Ici tu peux modifier le texte de tes fichiers à exporter. Pour
            ajouter un champs variable tel que l'addresse ou le nom de la
            personne réfère toi à la liste ci dessous.
          </Typography>
          {matching.map((value) => (
            <Typography variant="subtitle1">{value}</Typography>
          ))}
        </Grid>

        <Grid item lg={6} md={6} xs={6}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} xs={12}>
              <TextField
                name="name"
                size="small"
                fullWidth
                label="Nom du template"
                type="text"
                value={template.name || ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Type de fichier
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={handleChange}
                  value={template.type || ""}
                  name="type"
                >
                  {Object.values(type).map((value) => (
                    <MenuItem value={value.value}>
                      <em>{value.label}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Pour qui ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={handleChange}
                  value={template.whom || ""}
                  name="whom"
                >
                  {Object.values(whom).map((value) => (
                    <MenuItem value={value.value}>
                      <em>{value.label}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={12} xs={12} className={classes.cellCenter}>
              <TextField
                name="textStart"
                size="small"
                multiline
                rows={3}
                fullWidth
                label="Object"
                type="text"
                value={template.textStart || ""}
                onChange={handleChange}
                variant="outlined"
              />
              <IconButton>
                <InfoRounded />
              </IconButton>
            </Grid>
            <Grid item lg={12} md={12} xs={12} className={classes.cellCenter}>
              <TextField
                name="textBody"
                size="small"
                multiline
                rows={8}
                fullWidth
                label="Text body"
                type="text"
                value={template.textBody || ""}
                onChange={handleChange}
                variant="outlined"
              />
              <IconButton>
                <InfoRounded />
              </IconButton>
            </Grid>
            <Grid item lg={12} md={12} xs={12} className={classes.cellCenter}>
              <TextField
                name="textEnd"
                size="small"
                multiline
                rows={3}
                fullWidth
                label="Post Scriptum"
                type="text"
                value={template.textEnd || ""}
                onChange={handleChange}
                variant="outlined"
              />
              <IconButton>
                <InfoRounded />
              </IconButton>
            </Grid>
            <Grid item lg={12} md={12} xs={12} className={classes.cellRight}>
              <Button variant="outlined" style={{marginRight : 10}} onClick={() => history.goBack()}>Annuler</Button>
              <Button variant="contained" onClick={saveChange}>
                Valider
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.boxPreview}>
          <TemplateGenerator
            accomodation={fakeAccomodation}
            owner={fakeOwner}
            date={fakeDate}
            template={template}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TemplateEdit;
