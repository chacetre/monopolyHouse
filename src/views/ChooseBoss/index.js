import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Button,
  Paper,
  Grid
} from "@material-ui/core";
import AddOwnerModal from "./components/AddOwnerModal";
import { getOwnerDataBase } from "request/ownerAPI";
import { useOwner } from "../../context/owner";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  textWhite: {
    color: theme.palette.white,
  },
  expediteur: {
    textAlign: "right",
  },
  centerText: {
    textAlign: "center",
    marginBottom: 30,
  },
  explanation: {
    marginBottom: 30,
  },
  imageContainer: {
    marginRight: 20,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
  },
  image: {
    width: "30%",
    marginBottom: 20,
  },
  imageHeader: {
    width: "20%",
    marginBottom: 20,
  },
  paper: {
    padding: 20,
    height: "100%",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
  },
}));

const ChooseBoos = (props) => {
  const { history } = props;
  const classes = useStyles();
  const { setOwnerInformations } = useOwner();
  const [showAddOwner, setShowAddOwner] = useState(false);
  const [owners, setData] = useState(null);

  function getBossInformations() {
    getOwnerDataBase((response) => {
      console.log("response get owner", response);
      setData(response);
    });
  }

  function handleAddOwner() {
    setShowAddOwner(true);
  }

  function handleClickCard(owner) {
    console.log(owner);
    setOwnerInformations(owner);
    history.push("/accommodations");
  }

  useEffect(() => {
    getBossInformations();
  }, []);


  return (
    <div className={classes.root}>
      <div className={classes.explanation}>
        <div className={classes.centerText}>
          <img
            alt="Product"
            className={classes.image}
            src={"/images/logos/logo_houses.svg"}
          />
        </div>
        <Grid container>
          <Grid item xs={8}>
            <div className={classes.content}>
              <Typography variant="h2">Sélectionne ton proprio !</Typography>
              <Typography variant="overline">
                Choisi le propriétaire dont tu souhaites voir les biens
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4} className={classes.expediteur}>
            <Button
              variant="contained"
              onClick={handleAddOwner}
              className={classes.expediteur}
            >
              AJOUTER UN proprio
            </Button>
          </Grid>
        </Grid>
      </div>

      <AddOwnerModal
        open={showAddOwner}
        onClose={(pedal) => {
          setShowAddOwner(false);
        }}
      />

      <Grid container spacing={4}>
        {owners != null &&
          Object.values(owners).map((owner, index) => (
            <Grid item xs={3}>
              <Paper
                elevation={0}
                className={classes.paper}
                onClick={() => handleClickCard(owner)}
              >
                <img
                  alt="Product"
                  className={classes.image}
                  src={"/images/avatars/icon_" + index + ".svg"}
                />

                {!owner.isSociety && (
                  <Typography variant="h3" className={classes.textWhite}>
                    {owner.firstname.toUpperCase() +
                      " " +
                      owner.lastname.toUpperCase()}
                  </Typography>
                )}
                {owner.isSociety && (
                  <Typography variant="h3" className={classes.textWhite}>
                    {owner.socialIdentity.toUpperCase()}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ChooseBoos;
