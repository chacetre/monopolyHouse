import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  TableRow,
  Grid,
  colors,
  IconButton,
  Table,
  TableCell,
  TableBody,
} from "@material-ui/core";
import LensRounded from '@material-ui/icons/LensRounded'
import CloseRounded from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: "40%",
    maxHeight: "90%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  actions: {
    justifyContent: "flex-end",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    margin: 10,
  },
  buttonClose: {
    backgroundColor: colors.red[500],
    color: colors.grey[50],
  },
  buttonModify: {
    backgroundColor: colors.blue[500],
    color: colors.grey[50],
    marginRight: 5,
  },
}));

function InformationsPedalModal({
  open,
  onClose,
  productData,
  components,
  className,
  ...rest
}) {
  const classes = useStyles();

  function componentAvailable(component) {

    const splitPathCompo = component.path.split('/');
    
    const valueCurrent =
      components.componentsStock[splitPathCompo[0]][splitPathCompo[1]];
    const index = valueCurrent.findIndex(p => p.value == splitPathCompo[2]);

    const stockComponents = valueCurrent[index].stock;
   
    return parseInt(stockComponents) > parseInt(component.quantity);
  }

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
    <Modal open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title={`Informations pédale : ${productData.title}`}
            action={
              <>
                <Button onClick={modifyClose} className={classes.buttonModify}>
                  Modifier
                </Button>
                <IconButton onClick={cancelClose}>
                  <CloseRounded />
                </IconButton>
              </>
            }
          />
          <Divider />
          <CardContent>
            <Table container spacing={3} className={classes.container}>
              <TableBody>
                {Object.keys(productData.components).map((component, i) => (
                  <>
                    {(productData.components[component].quantity !== "0" ||
                      productData.components[component].quantity !== "") && (
                      <TableRow>
                        <TableCell>
                          {productData.components[component].path}
                        </TableCell>
                        <TableCell>
                          {productData.components[component].label}
                        </TableCell>
                        <TableCell align="right">
                          {productData.components[component].quantity}
                        </TableCell>
                        <TableCell align="right" justifyContent="center">
                          {!componentAvailable(productData.components[component]) ? <LensRounded style={{color : "#ef9a9a"}} fontSize="small"/> : null}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
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
  open: PropTypes.bool,
};

InformationsPedalModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default InformationsPedalModal;
