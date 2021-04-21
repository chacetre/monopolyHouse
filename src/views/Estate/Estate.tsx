import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { colors } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useOwner } from "../../context/owner";
import AddEstateModal from "../../components/Estate/AddEstateModal";
import CardAccommodation from "../../components/Estate/CardAccomodation";
import { getAccomodationByOwner } from "../../api/accomodationAPI";
import {getIndexesParticularAPI, getIndexesSocietyAPI} from "../../api/settingsAPI";
import {Estate} from "../../constantes/ConstEstate";
import {WSIndexesInsee} from "../../constantes/ConstWS";

const useStyles = makeStyles((theme: any) => ({
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
  const [showAddEstateModal, setShowAddEstateModal] = useState<boolean>(false);
  const [selectCity, setSelectedCity] = useState<string>("");
  const [estateList, setEstateList] = useState<Estate[]>([]);
  const [listFiltre, setFiltres] = useState<string[]>([]);
  const [indexesParticular, setIndexesParticular] = useState<WSIndexesInsee>({});
  const [indexesSociety, setIndexesSociety] = useState<WSIndexesInsee>({});

  function getAccommodationsInformations() {
    if (ownerInformations.id !== undefined) {
      getAccomodationByOwner(ownerInformations.id, (response : any) => {
        if(response) {
          const responseList : Estate[] = Object.values(response)
          setEstateList(responseList);
        } else {
          setEstateList([]);
        }
      });
    }
  }

  function getIndexesParticular() {
    getIndexesParticularAPI((response : WSIndexesInsee) => {
      setIndexesParticular(response)
    });
  }

  function getIndexesSociety() {
    getIndexesSocietyAPI((response : WSIndexesInsee) => {
      setIndexesSociety(response)
    });
  }

  const handleComponent = (event : any, newComponent: any) => {
    setSelectedCity(newComponent);
  };

  function handleAddEstate() {
    setShowAddEstateModal(true);
  }

  function matchCity(element : Estate) {
    if (selectCity === "") {
      return true;
    }
    return element.address.city === selectCity;
  }

  useEffect(() => {
    getAccommodationsInformations();
    getIndexesSociety();
    getIndexesParticular();
  },[]);


  useEffect(() => {
    getAccommodationsInformations();
  }, [ownerInformations]);

  useEffect(() => {
    if (estateList) {
      var listTemp :string[] = [];
      Object.values(estateList).forEach((element) => {
        listTemp.push(element.address.city);
      });

      setFiltres(Array.from(new Set(listTemp)));
    }
  }, [estateList]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={6} md={6} xs={6}>
          <Typography variant="h1">Tes logements</Typography>
          <Typography variant="body1">
            Ici tu peux modifier les locataires des logements ainsi qu'ajouter
            un logement via le button ajouter.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={6} className={classes.cellRight}>
          <Button
            variant="contained"
            onClick={handleAddEstate}
          >
            {" "}
            ajouter un logement{" "}
          </Button>
        </Grid>
      </Grid>

      <AddEstateModal
        open={showAddEstateModal}
        onClose={() => {
          setShowAddEstateModal(false);
        }}
      />

      <div>
        <StyledToggleButtonGroup
          size="small"
          value={selectCity}
          exclusive
          onChange={handleComponent}
          aria-label="text alignment"
          className={classes.center}
        >
          <ToggleButton value={""} aria-label="left aligned">
            Tous
          </ToggleButton>
          {listFiltre.map((filtre, index) => (
            <ToggleButton value={filtre} aria-label="left aligned" key={index}>
              {filtre}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </div>
      <Grid container spacing={5}>
        {estateList !== null &&
          estateList
            .filter(matchCity)
            .map((product: Estate, index : number) => (
              <Grid item xs={6} key={index}>
                <CardAccommodation accomodationInfos={product} indexes={product.rental.isParticulier ? indexesParticular : indexesSociety}/>
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Accommodation;
