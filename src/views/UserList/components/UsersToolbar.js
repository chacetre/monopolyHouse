import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import UpdateStockModal from './UpdateStockModal';
import NewCompentModal from './NewCompentModal';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  center: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(1),
    border: 'none',
    background: theme.palette.background.default,
    padding: theme.spacing(0, 3),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);

const UsersToolbar = props => {
  const { className, onChange, users, ...rest } = props;

  const classes = useStyles();
  const [component, setComponent] = useState('resistor');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [componentInfo, setComponentInfo] = useState({});

  const handleComponent = (event, newComponent) => {
    setComponent(newComponent);
    onChange(newComponent);
  };

  const handleClickUpdate = event => {
    setOpenUpdateModal(true);
  };

  const handleClickNewComponent = event => {
    setOpenNewModal(true);
  };

  useEffect(() => {
    if (users !== undefined) {
      console.log('component toolbar', users);
      setComponentInfo(users);
    }
  }, [users]);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <UpdateStockModal
        composent={componentInfo}
        onClose={color => {
          setOpenUpdateModal(false);
        }}
        open={openUpdateModal}
      />
      <NewCompentModal
        composent={componentInfo}
        onClose={color => {
          setOpenNewModal(false);
        }}
        open={openNewModal}
      />
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="outlined"
          onClick={handleClickNewComponent}
          className={classes.importButton}
        >
          Nouveau Composant
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClickUpdate}
        >
          Mise à jour du Stock
        </Button>
      </div>
      <div className={classes.center}>
        {componentInfo.componentsAvailable !== undefined && (
          <StyledToggleButtonGroup
            size="small"
            value={component}
            exclusive
            onChange={handleComponent}
            aria-label="text alignment"
            className={classes.center}
          >
            {componentInfo.componentsAvailable.map(user => (
              <ToggleButton value={user} aria-label="left aligned">
                {user}
              </ToggleButton>
            ))}
          </StyledToggleButtonGroup>
        )}
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default UsersToolbar;
