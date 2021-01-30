import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { func } from "prop-types";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CardHeader,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
} from "@material-ui/core";
import { colors } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import CreateRounded from "@material-ui/icons/CreateRounded";
import Particulier from "./Components/Particulier";
import Society from "./Components/Society";
import { useOwner } from "../../context/owner";
import AddEstateModal from "./Components/AddEstateModal";
import CardAccommodation from "./Components/CardAccomodation";
import { getAccomodationByOwner } from "request/accomodationAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: 10,
  },
  titleBar: {
    backgroundColor: theme.palette.primary.main,
    color: colors.grey[50],
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
  },
  right: {
    paddingTop: 10,
    textAlign: "right",
  },
  gridCell: {
    justifyContent: "center",
  },
  cellRight: {
    textAlign: "right",
    paddingRight: 25,
  },
  titleSection: {
    marginBottom: 2,
    marginLeft: 10,
  },
  textWhite: {
    color: colors.grey[50],
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 15,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
  btnAction: {
    backgroundColor: theme.palette.action.main,
    color: theme.palette.white,
  },
  containerTitle: {
    paddingTop: 10,
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(1),
    border: "none",
    background: theme.palette.white,
    padding: theme.spacing(0, 3),
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))(ToggleButtonGroup);

const Accommodation = () => {
  const classes = useStyles();
  const { ownerInformations } = useOwner();
  const [showAddEstateModal, setShowAddEstateModal] = useState(false);
  const [component, setComponent] = useState("");
  const [accommodations, setData] = useState(null);
  const [listFiltre, setFiltres] = useState([]);

  function getAccommodationsInformations() {
    if (ownerInformations.id != undefined) {
      getAccomodationByOwner(ownerInformations.id, (response) => {
        setData(response);
      });
    }
  }

  const handleComponent = (event, newComponent) => {
    setComponent(newComponent);
  };

  function handleAddEstate() {
    setShowAddEstateModal(true);
  }

  function suffisammentGrand(element) {
    if (component == "") {
      return true;
    }
    return element.address.city == component;
  }

  useEffect(() => {
    getAccommodationsInformations();
  }, []);

  useEffect(() => {
    getAccommodationsInformations();
  }, [ownerInformations]);

  useEffect(() => {
    if (accommodations != undefined) {
      var listTemp = new Array();
      Object.values(accommodations).forEach((element) => {
        listTemp.push(element.address.city);
      });

      setFiltres(Array.from(new Set(listTemp)));
    }
  }, [accommodations]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={6} md={6} xs={6} className={classes.title}>
          <Typography variant="h1">Tes logements</Typography>
          <Typography variant="body1">
            Ici tu peux modifier les locataires des logements ainsi qu'ajouter
            un logement via le button ajouter.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.cellRight}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddEstate}
          >
            {" "}
            ajouter un logement{" "}
          </Button>
        </Grid>
      </Grid>

      <AddEstateModal
        open={showAddEstateModal}
        onClose={(pedal) => {
          setShowAddEstateModal(false);
        }}
      />

      <div>
        <StyledToggleButtonGroup
          size="small"
          value={component}
          exclusive
          onChange={handleComponent}
          aria-label="text alignment"
          className={classes.center}
        >
          <ToggleButton value={""} aria-label="left aligned">
            Tous
          </ToggleButton>
          {listFiltre.map((filtre) => (
            <ToggleButton value={filtre} aria-label="left aligned">
              {filtre}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </div>
      <Grid container spacing={5}>
        {accommodations !== null &&
          Object.values(accommodations)
            .filter(suffisammentGrand)
            .map((product) => (
              <Grid item xs={6}>
                <CardAccommodation accomodationInfos={product} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Accommodation;
