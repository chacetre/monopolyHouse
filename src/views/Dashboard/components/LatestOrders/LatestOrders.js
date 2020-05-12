import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getStockDataBase } from '../../../../request/stockAPI';

import mockData from './data';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(mockData);
  const [data, setData] = useState({});
  const [listLowStock, setListLowStock] = useState([]);

  function getStockLow(){
    if (data === undefined || data === null || data.componentsStock === undefined){
      console.log('data',data)
      return;
    }

    const listComponentLow = [];

    console.log('data',data)
    const listType = Object.values(data.componentsStock);

    listType.forEach(element => {
      const listSousType = Object.keys(element)

      listSousType.forEach(sousType => {
        if (sousType !== 'typeAvailable'){

          Object.values(element[sousType]).forEach(value => {
            
            if (value.stock < 4){
            const scheme = {
              type : sousType,
              value: value.label,
              stock: value.stock
            }

            listComponentLow.push(scheme);
          }
          });
        }
      });
      
    });

    console.log('listComponentLow',listComponentLow)
    setListLowStock(listComponentLow);
  }

  const getUserData = () => {
    getStockDataBase(response => {
      setData(response);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (data !== undefined){
      getStockLow();
    }
    
  }, [data]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Liste de course"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Composant</TableCell>
                  <TableCell>
Nombre restant
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {listLowStock.map(order => (
                  <TableRow
                    hover
                    
                  >
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.value}</TableCell>
                    <TableCell>
                    {order.stock}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
