import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Divider, Grid, Typography } from "@material-ui/core";

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
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  destinataire: {
    textAlign: "left",
  },
  expediteur: {
    textAlign: "right",
  },
  page: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
    fontSize: 30,
  },
  pageBis: {
    width: "210mm",
    height: "297mm",
    padding: 30,
    fontSize: 20,
  },
  divider: {
    margin: 15,
    backgroundColor: theme.palette.white
  },
  montant: {
    width: "50%",
    textAlign: "left",
  },
}));

const Template = ({ owner, accomodation, date, ...rest }) => {
  const classes = useStyles();
  const [dateReceipt, setDateReceipt] = useState({});

  function calculateTotal() {
    var numFixe = Number(accomodation.loyer.fixe);
    var numCharges = Number(accomodation.loyer.charges);
    var numTVA =
      accomodation.isCommercial == undefined
        ? Number(accomodation.loyer.tva)
        : 0;

    return numFixe + numCharges + numTVA;
  }

  useEffect(() => {
    setDateReceipt(date);
  }, [date]);

  return (
    <div id="divToPrint" className={classes.page}>
      <div class="divToPrint">
        <div className={classes.pageBis}>
          <div className={classes.destinataire}>
            <Typography variant="letter">
              {!owner.isSociety
                ? owner.firstname.toUpperCase() +
                  " " +
                  owner.lastname.toUpperCase()
                : owner.socialIdentity}
            </Typography>
          </div>
          <div className={classes.destinataire}>
            <Typography variant="letter">
              {owner.address.street.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.destinataire}>
            <Typography variant="letter">
              {owner.address.postalCode.toUpperCase() +
                " " +
                owner.address.city.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.expediteur}>
            {
              <Typography variant="letter">
                {" "}
                {accomodation.rental.isParticulier
                  ? accomodation.rental.firstname.toUpperCase() +
                    " " +
                    accomodation.rental.lastname.toUpperCase()
                  : accomodation.rental.socialIdentity}
              </Typography>
            }
          </div>
          <div className={classes.expediteur}>
            <Typography variant="letter">
              {accomodation.address.street.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.expediteur}>
            <Typography variant="letter">
              {accomodation.address.postalCode.toUpperCase() +
                " " +
                accomodation.address.city.toUpperCase()}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.destinataire}>
            <Typography variant="letter">
              {civilityTranslation[accomodation.rental.civility]},
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="letter">
              Je vous remercie d'avoir effectué le versement du montant de votre
              loyer pour la periode du 1er au {lastDay[dateReceipt.month]} {dateReceipt.month}{" "}
              pour les locaux que vous occupez sis à{" "}
              {accomodation.address.city.toUpperCase()},{" "}
              {accomodation.address.street.toUpperCase()}, et dont le detail est
              ci dessous:
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.montant}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="letter">Loyer :</Typography>
              </Grid>
              <Grid item xs={6} className={classes.expediteur}>
                <Typography variant="letter">
                  {accomodation.loyer.fixe},00
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="letter">
                  Provision sur charges :
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.expediteur}>
                <Typography variant="letter">
                  {accomodation.loyer.charges},00
                </Typography>
              </Grid>

              {!accomodation.isCommercial && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="letter">TVA :</Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.expediteur}>
                    <Typography variant="letter">
                      {" "}
                      {accomodation.loyer.tva},00
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={6} />
              <Grid item xs={6} className={classes.expediteur}>
                ------------
              </Grid>
              <Grid item xs={6}>
                <Typography variant="letter">Total :</Typography>
              </Grid>
              <Grid item xs={6} className={classes.expediteur}>
                <Typography variant="letter">{calculateTotal()},00</Typography>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.destinataire}>
            <Typography variant="letter" >
              Veuillez agréer,{" "}
              {civilityTranslation[accomodation.rental.civility]}, l'expression
              de mes sentiments distingués{" "}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
