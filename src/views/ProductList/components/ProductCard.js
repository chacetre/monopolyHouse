import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import InformationsPedalModal from './InformationsPedalModal';
import AddPedalModal from './AddPedalModal';
import { addPedalsMadeDataBase } from '../../../request/pedalsAPI';
import { updateStockAfterAddPedals } from '../../../request/stockAPI';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    marginRight: 20,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = props => {
  const { className, product, components, ...rest } = props;

  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [textPossibleCreate, setTextPossibleCreate] = useState('no');

  const handleClickShowInfos = event => {
    setOpenModal(true);
  };

  function componentAvailable(component) {

    console.log('component', component);
    const splitPathCompo = component.path.split('/');
    

    const valueCurrent =
      components.componentsStock[splitPathCompo[0]][splitPathCompo[1]];
    const index = valueCurrent.findIndex(p => p.value == splitPathCompo[2]);

    const stockComponents = valueCurrent[index].stock;

    return stockComponents > component.quantity;
  }

  function pedalePossibleCreate() {
    Object.values(product.components).every(element => {
      if (!componentAvailable(element)) {
        console.log(false);
        setTextPossibleCreate('no');
        return false;
      }
      else{
        setTextPossibleCreate('ouiiiii');
      } return true
    });
    
  }

  function getNewStockComponent(component, stockNeed) {
    const splitPathCompo = component.path.split('/');
    console.log('splitPathCompo', splitPathCompo);
    const valueCurrent =
      components.componentsStock[splitPathCompo[0]][splitPathCompo[1]];
    const index = valueCurrent.findIndex(p => p.value == splitPathCompo[2]);

    const stock = valueCurrent[index].stock - component.quantity;
    updateStockAfterAddPedals(
      `/${splitPathCompo[0]}/${splitPathCompo[1]}/${index}`,
      stock
    );
  }

  function updateStockComponents() {
    console.log('product', product);
    Object.values(product.components).forEach(element => {
      getNewStockComponent(element);
    });
  }

  const handleAddPedalsMade = event => {
    addPedalsMadeDataBase(product.id, product.totalMade + 1);
    updateStockComponents();
  };

  useEffect(() => {
    if (components !== undefined){
      //pedalePossibleCreate();
    }
    
  }, [product]);

  return (
    <>
      <InformationsPedalModal
        productData={product}
        onClose={modifyAction => {
          setOpenModal(false);
          setOpenModifyModal(modifyAction);
        }}
        open={openModal}
      />

      <AddPedalModal
        pedalInformations={product}
        onClose={color => {
          setOpenModifyModal(false);
        }}
        open={openModifyModal}
      />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent>
          <Grid container>
            <Grid xs={4}>
              <div className={classes.imageContainer}>
                <img
                  alt="Product"
                  className={classes.image}
                  src="/images/pedal_icon.svg"
                />
              </div>
            </Grid>
            <Grid xs={8}>
              <Typography gutterBottom variant="h4">
                {product.title}
              </Typography>
              <Typography variant="body1">
                Nombre produite : {product.totalMade}
              </Typography>

              <Typography variant="body1">
                Possible à faire : {textPossibleCreate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justify="space-between">
            <Grid className={classes.statsItem} item>
              <Button onClick={handleClickShowInfos}>
                {' '}
                VOIR LES COMPOSANTS
              </Button>
            </Grid>
            <Grid className={classes.statsItem} item>
              <Button onClick={handleAddPedalsMade}>AJOUTER</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
