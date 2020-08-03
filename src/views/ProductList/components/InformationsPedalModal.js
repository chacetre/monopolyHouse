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
  Typography,
  Grid,
  colors, 
  IconButton
} from "@material-ui/core";

import CloseRounded from '@material-ui/icons/CloseRounded';


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
    backgroundColor : colors.red[500],
    color : colors.grey[50],
    
  }, 
  buttonModify :{
    backgroundColor : colors.blue[500],
    color : colors.grey[50],
    marginRight: 5
  }
}));


function InformationsPedalModal({
  open,
  onClose,
  productData,
  className,
  ...rest
}) {
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
    <Modal open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title={`Informations pédale : ${productData.title}`}
            action={
              <>
                <Button onClick={modifyClose} className={classes.buttonModify}>Modifier</Button>
                <IconButton onClick={cancelClose} ><CloseRounded/></IconButton>
              </>
            }
          />
          <Divider />
          <CardContent>
            {Object.keys(productData.components).map((component, i) => (
              <>
                {(productData.components[component].quantity !== "0" ||
                  productData.components[component].quantity !== "") && (
                  <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={6}> <Typography>{productData.components[component].path}</Typography></Grid>
                    <Grid item xs={3}><Typography>{productData.components[component].label}</Typography></Grid>
                    <Grid item xs={3}><Typography>{productData.components[component].quantity}</Typography></Grid>
                  </Grid>
                )}
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
  open: PropTypes.bool,
};

InformationsPedalModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default InformationsPedalModal;
