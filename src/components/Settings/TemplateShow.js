import React from "react";
import clsx from "clsx";
import { makeStyles} from "@material-ui/styles";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
  cardActions: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
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
    fixe: "11", indexInsee: false

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
  let history = useHistory();

  const cancelClose = () => {
    onClose();
  };

  function editTemplate(id) {
    history.push(`/settings/template/${id}`);
  }

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent>
          <TemplateGenerator
            owner={fakeOwner}
            accomodation={fakeAccomodation}
            date = {fakeDate}
            template={template.id}
            type="id"
            display
          />
        </CardContent>
        <CardActions disableSpacing>
          <div className={classes.cardActions}>
          <Button onClick={cancelClose} variant="contained" color="primary" style={{marginRight: 10}} >annuler</Button>
          <Button onClick={editTemplate} variant="contained" >Modifier</Button>
          </div>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default Templates;
