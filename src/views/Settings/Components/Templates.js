import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions
} from "@material-ui/core";
import { getTemplatesAPI } from "request/settingsAPI";
import TemplateShow from "./TemplateShow";
import { useHistory } from "react-router-dom";

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
  cardActions: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "35%", // 16:9
  },
  title :{
    textAlign: "center"
  }
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

  function handleAddTemplate() {
    history.push(`/settings/template/new`);
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
        <Grid item lg={6} md={6} xs={6}>
          <Typography variant="h1">Les templates</Typography>
          <Typography variant="body1">
            Ici tu peux modifier les locataires des logements ainsi qu'ajouter
            un logement via le button ajouter.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.cellRight}>
          <Button variant="contained" onClick={handleAddTemplate}>
            Ajouter un template
          </Button>
        </Grid>

        {listTemplate !== null &&
          Object.values(listTemplate).map((template) => (
            <>
              <Grid item lg={4} md={4} xs={4}>
                <Card>
                  <CardHeader title={<Typography variant= "h3" className={classes.title}>{template.name}</Typography>} />
                  <CardContent className={classes.content}>
                    <div className={classes.media}>
                      <img alt="Logo" src="/images/file.svg" />
                    </div>
                  </CardContent>
                  <CardActions>
                    <div className={classes.cardActions}>
                      <Button
                        variant="contained"
                        onClick={() => handleShowTemplate(template)}
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        Voir
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => editTemplate(template.id)}
                        color="secondary"
                      >
                        Modifier
                      </Button>
                    </div>
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
