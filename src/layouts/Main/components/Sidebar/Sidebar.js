import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import HomeRounded from '@material-ui/icons/HomeRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StoreMallDirectoryRounded from '@material-ui/icons/StoreMallDirectoryRounded';

import {SidebarNav } from './components';
import { AccountCircleRounded, CategoryRounded, HouseRounded, ReceiptRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Logements',
      href: '/accommodations',
      icon: <HomeRounded />
    },
    {
      title: 'Quittances',
      href: '/receipts',
      icon: <ReceiptRounded />
    },
    {
      title: 'Paramètres',
      href: '/products',
      icon: <CategoryRounded />
    },
    {
      title: 'Profil',
      href: '/products',
      icon: <AccountCircleRounded />
    }
    
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
