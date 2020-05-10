import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ProductsToolbar from './components/ProductsToolbar';
import ProductCard from './components/ProductCard';
import Firebase from 'firebase';
import { getStockDataBase } from 'request/stockAPI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [dataPedal, setDataFirebase] = useState([]);
  const [dataCompoents, setComponentsFirebase] = useState([]);
  const [numbersPedals, setNumberPedal] = useState(0);

  const getPedalData = () => {
    let ref = Firebase.database().ref('/pedals');
    ref.on('value', snapshot => {
      const data = snapshot.val();
      console.log('data firebase', data);
      setDataFirebase(data);
      setNumberPedal(data.length);
      
    });
  };

  useEffect(() => {
    getPedalData();
    getStockDataBase(response => (
      setComponentsFirebase(response)
    ));
  }, []);

  return (
    <div className={classes.root}>
      <ProductsToolbar numbersPedals={numbersPedals} />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {dataPedal !== null &&
            dataPedal.map(product => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <ProductCard product={product} components={dataCompoents} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default ProductList;
