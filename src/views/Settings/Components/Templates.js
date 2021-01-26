import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { func } from "prop-types";
import {
  Typography,
  Grid,
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import {
  getIndexesAPI,
  updateIndexesAPI,
  saveNewIndex,
  getTemplatesAPI,
} from "request/settingsAPI";
import TemplateShow from "./TemplateShow";
import { useHistory } from "react-router-dom";
import { FaceOutlined } from "@material-ui/icons";

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
  content: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Templates = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [listTemplate, setTemplates] = useState({});
  const [showTemplate, setShowTemplate] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState(false);

  function getTemplates() {
    getTemplatesAPI((response) => {
      setTemplates(response);
    });
  }

  function editTemplate(id) {
    history.push(`/settings/template/${id}`);
  }

  function handleShowTemplate(template) {
    setSelectTemplate(template);
    setShowTemplate(true);
  }

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className={classes.root}>
      <TemplateShow
        open={showTemplate}
        template={selectTemplate}
        onClose={(pedal) => {
          setShowTemplate(false);
        }}
      />
      <Grid container spacing={5}>
        <Grid item lg={6} md={6} xs={6} className={classes.title}>
          <Typography variant="h1">Les templates</Typography>
          <Typography variant="body1">
            Ici tu peux modifier les locataires des logements ainsi qu'ajouter
            un logement via le button ajouter.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.cellRight}>
          <Button variant="contained">Ajouter un template</Button>
        </Grid>
        
        {listTemplate !== null && Object.values(listTemplate).map((template) => (
          <>
            <Grid item lg={4} md={4} xs={4} className={classes.title}>
              <Card>
                <CardHeader title={template.name} />
                <CardContent className={classes.content}>
                  <Chip icon={<FaceOutlined />} label={template.type}  />
                  <Chip label={template.whom}  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => handleShowTemplate(template)}
                  >
                    Voir
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => editTemplate(template.id)}
                  >
                    Modifier
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default Templates;
