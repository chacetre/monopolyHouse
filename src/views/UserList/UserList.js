import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import mockData from './data';
import TableGenerator from './components/TableGenerator';
import UsersToolbar from './components/UsersToolbar';
import Firebase from 'firebase';
import { getStockDataBase } from '../../request/stockAPI';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [componentDisplay, setComponengDisplay] = useState('resistor');

  const getUserData = () => {
    getStockDataBase(response => {
      setData(response);
    });
  };

  function handleComponentChange(newComponent) {
    setComponengDisplay(newComponent);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={classes.root}>
      {data.componentsStock !== undefined && (
        <UsersToolbar users={data} onChange={handleComponentChange} />
      )}
      <div className={classes.content}>
        {data.componentsStock !== undefined && (
          <TableGenerator listTable={data.componentsStock[componentDisplay]} />
        )}
      </div>
    </div>
  );
};

export default UserList;
