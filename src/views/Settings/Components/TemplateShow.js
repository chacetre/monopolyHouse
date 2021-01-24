import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import { func } from "prop-types";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@material-ui/core";
import {
  getIndexesAPI,
  updateIndexesAPI,
  saveNewIndex,
} from "request/settingsAPI";
import TemplateGenerator from "./TemplateGenerator";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: "60%",
    maxHeight: "90%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  button: {
    marginBottom: 30,
  },
  titleCell: {
    marginBottom: 10,
  },
  cellRight: {
    textAlign: "right",
    paddingRight: 25,
  },
}));

const fakeAccomodation = {
  address: {
    city: "Asnieres sur seine",
    otherInformations: "22",
    postalCode: "92600",
    street: "45 avenue de la marne",
  },
  id: 1610812465116,
  isCommercial: "false",
  loyer: {
    charges: "11",
    fixe: "11",
  },
  owner: 1610293593160,
  rental: {
    civility: "mme",
    firstname: "isabelle",
    isParticulier: "true",
    lastname: "cetre",
    startDate: "1212",
  },
};
const fakeOwner = {
  civility: "mme",
  firstname: "Valerie",
  id: 1610291148358,
  isOwner: true,
  isSociety: false,
  lastname: "Macron et tout la famille",
  address: {
    city: "Asnieres sur seine",
    otherInformations: "22",
    postalCode: "92600",
    street: "45 avenue de la marne",
  }
};

const fakeDate = {
  month: "janvier",
  years: 2011,
};

const Templates = ({ open, className, onClose, template, ...rest }) => {
  const classes = useStyles();

  const cancelClose = () => {
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title={template.name} />
        <CardContent>
          <TemplateGenerator
            owner={fakeOwner}
            accomodation={fakeAccomodation}
            date = {fakeDate}
            template={template}
          />
        </CardContent>
        <CardActions disableSpacing>
          <Button onClick={cancelClose}>annuler</Button>
          <Button>Modifier</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default Templates;
