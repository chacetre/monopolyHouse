import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import AddPedalModal from './AddPedalModal';

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
  }
}));

const ProductsToolbar = props => {
  const { className, numbersPedals, ...rest } = props;

  const classes = useStyles();
  const [openColorModal, setOpenColorModal] = useState(false);

  const handleClickUpdate = event => {
    setOpenColorModal(true);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <AddPedalModal
        index={numbersPedals}
        onClose={pedal => {
          setOpenColorModal(false);
        }}
        open={openColorModal}
      />
      <span className={classes.spacer} />
      <Button color="primary" variant="contained" onClick={handleClickUpdate}>
        Ajouter une pedale
      </Button>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
