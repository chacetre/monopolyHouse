import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Divider, Grid, Typography } from "@material-ui/core";
import { getTemplateByIdAPI } from "request/settingsAPI";

const lastDay = {
  janvier: 31,
  fevrier: 28,
  mars: 31,
  avril: 30,
  mai: 31,
  juin: 30,
  juillet: 31,
  aout: 31,
  septembre: 30,
  octobre: 31,
  novembre: 30,
  decembe: 31,
};

const civilityTranslation = {
  m: "Monsieur",
  mme: "Madame",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    fontFamily: 'Roboto'
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  destinataire: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  expediteur: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginLeft: "auto"
  },
  alignRight:{
    textAlign : "right"
  },
  page: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
    fontSize: 30,
  },
  pageBis: {
    padding: 30,
    fontSize: 20,
  },
  divider: {
    margin: 15,
    backgroundColor: theme.palette.white,
  },
  montant: {
    width: "50%",
    textAlign: "left",
  },
}));

const TemplateGenerator = ({
  owner,
  accomodation,
  date,
  display,
  toPrint,
  template,
  templateValue,
  type,
  ...rest
}) => {
  const classes = useStyles();
  const [templateLocal, setTemplate] = useState({});
  const [templateFromApi, setTemplateFromApi] = useState({});

  function calculateTotal() {
    var numFixe = Number(accomodation.loyer.fixe);
    var numCharges = Number(accomodation.loyer.charges);
    var numTVA =
      accomodation.isCommercial === undefined
        ? Number(accomodation.loyer.tva)
        : 0;

    return (numFixe + numCharges + numTVA).toFixed(2);
  }

  function change(textChange) {
    var textTranslate = textChange
      .replace(
        "[rent.civility]",
        civilityTranslation[accomodation.rental.civility]
      )
      .replace("[rent.firstname]", accomodation.rental.firstname.toUpperCase())
      .replace("[rent.lastname]", accomodation.rental.lastname.toUpperCase())
      .replace("[rent.city]", accomodation.address.city.toUpperCase())
      .replace("[rent.street]", accomodation.address.street.toUpperCase())
      .replace(
        "[rent.postalCode]",
        accomodation.address.postalCode.toUpperCase()
      )
      .replace("[date.lastDay]", lastDay[date.month])
      .replace("[date.month]", date.month)
      .replace("[date.year]", date.year);

    return textTranslate;
  }

  function createDocument(templateValue) {
    if (templateValue) {
      var newTextBody = change(templateValue.textBody || "");
      var newTextStart = change(templateValue.textStart || "");
      var newTextEnd = change(templateValue.textEnd || "");
      setTemplate(() => ({
        ...templateValue,
        textBody: newTextBody,
        textStart: newTextStart,
        textEnd: newTextEnd,
      }));
    }
  }
  function getTemplateFromApi(id) {
    getTemplateByIdAPI(id, (response) => {
      console.log("response template", response);
      setTemplateFromApi(response);
    });
  }

  useEffect(() => {
    if (template && type === "id") getTemplateFromApi(template);
  }, [template]);

  useEffect(() => {
    if (templateValue && type === "template") createDocument(templateValue);
  }, [templateValue]);

  useEffect(() => {
    if (templateFromApi && type === "id") createDocument(templateFromApi);
  }, [templateFromApi]);

  return (
    <div id="divToPrint" className={display && classes.page}>
      <div class="divToPrint">
        <div
          className={classes.pageBis}
          style={toPrint ? { width: "210mm", height: "297mm" } : {}}
        >
          <div className={classes.destinataire}>
            <Typography variant="letter">
              {!owner.isSociety
                ? owner.firstname.toUpperCase() +
                  " " +
                  owner.lastname.toUpperCase()
                : owner.socialIdentity}
            </Typography>
            <Typography variant="letter">
              {owner.address.street.toUpperCase()}
            </Typography>
            <Typography variant="letter">
              {owner.address.postalCode.toUpperCase() +
                " " +
                owner.address.city.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.expediteur}>
            
              
                <Typography variant="letter">
                  {" "}
                  {accomodation.rental.isParticulier
                    ? accomodation.rental?.firstname?.toUpperCase() +
                      " " +
                      accomodation.rental?.lastname?.toUpperCase()
                    : accomodation.rental?.socialIdentity}
                </Typography>
              
            
            
              <Typography variant="letter">
                {accomodation.address.street.toUpperCase()}
              </Typography>
            
            
              <Typography variant="letter">
                {accomodation.address.postalCode.toUpperCase() +
                  " " +
                  accomodation.address.city.toUpperCase()}
              </Typography>
            
          </div>
          <Divider className={classes.divider} />

          <div>
            <Typography variant="letter">{templateLocal.textStart}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="letter">
              {civilityTranslation[accomodation.rental.civility]},
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="letter">{templateLocal.textBody}</Typography>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.montant}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="letter">Loyer :</Typography>
              </Grid>
              <Grid item xs={6} className={classes.alignRight}>
                <Typography variant="letter">
                  {Number(accomodation.loyer.fixe).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="letter">
                  Provision sur charges :
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.alignRight}>
                <Typography variant="letter">
                  {Number(accomodation.loyer.charges).toFixed(2)}
                </Typography>
              </Grid>

              {!accomodation.isCommercial && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="letter">TVA :</Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.alignRight}>
                    <Typography variant="letter">
                      {" "}
                      {accomodation.loyer.tva}
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={6} />
              <Grid item xs={6} className={classes.alignRight}>
                ------------
              </Grid>
              <Grid item xs={6}>
                <Typography variant="letter">Total :</Typography>
              </Grid>
              <Grid item xs={6} className={classes.alignRight}>
                <Typography variant="letter">{calculateTotal()}</Typography>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <div >
            <Typography variant="letter">
              Veuillez agréer,{" "}
              {civilityTranslation[accomodation.rental.civility]}, l'expression
              de mes sentiments distingués{" "}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="letter">{templateLocal.textEnd}</Typography>
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerator;
