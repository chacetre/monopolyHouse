import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  Divider,
  TableContainer,
  TableCell,
  Button,
  TableRow,
  IconButton
} from '@material-ui/core';
import { getStockDataBase } from '../../../request/stockAPI';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: '40%',
    maxHeight: '90%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    margin: 10
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    width : 100
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function InformationsPedalModal({ open, onClose, productData, className, ...rest }) {
  const classes = useStyles();
  

  

  const cancelClose = () => {
    onClose(false);
  };

  const modifyClose = () => {
    onClose(true);
  };

  if (!open) {
    return null;
  }
  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title={`Informations pédale : ${productData.title}`}
            action={
              <>
                <Button onClick={cancelClose}>Close</Button>
                <Button onClick={modifyClose}>Modifier</Button>
              </>
            }
          />
          <Divider />
          <CardContent>
            {Object.keys(productData.components).map((component, i) => (
              <>{(productData.components[component].quantity !== '0' ||productData.components[component].quantity !== '' ) 
              && <TableContainer className={classes.container}>
                <Table stickyHeader size="small">
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>{productData.components[component].label}</StyledTableCell>
                      <StyledTableCell>{productData.components[component].quantity}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>}
              </>
            ))}
          </CardContent>
          <Divider />
        </form>
      </Card>
    </Modal>
  );
}

InformationsPedalModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

InformationsPedalModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default InformationsPedalModal;
