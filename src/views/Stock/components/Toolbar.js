import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Button, Grid, colors, Divider } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import NewCompentModal from "./AddElements/NewCompentModal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  divider: {
    margin: 20,
    height: 3,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  center: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(1),
    border: "none",
    background: theme.palette.white,
    padding: theme.spacing(0, 3),
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))(ToggleButtonGroup);

const Toolbar = (props) => {
  const { className, onChange, components, modifiyngStock, ...rest } = props;

  const classes = useStyles();
  const [component, setComponent] = useState("aop");
  const [openAlert, setOpenAlert] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [componentInfo, setComponentInfo] = useState({});

  const handleClickNewComponent = (event) => {
    setOpenNewModal(true);
  };

  const handleComponent = (event, newComponent) => {
    if (newComponent === "new") {
      handleClickNewComponent();
      return;
    }

    if (modifiyngStock) {
      setOpenAlert(true);
      return;
    }
    setComponent(newComponent);
    onChange(newComponent);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (components !== undefined) {
      setComponentInfo(components);
    }
  }, [components]);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <NewCompentModal
        component={{length : componentInfo.componentsAvailable !== undefined ? componentInfo.componentsAvailable.length : 0}}
        onClose={(color) => {
          setOpenNewModal(false);
        }}
        open={openNewModal}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Vous n'avez pas sauvegardé vos modifications
        </Alert>
      </Snackbar>
      {componentInfo.componentsAvailable !== undefined && (
        <div>
          <StyledToggleButtonGroup
            size="small"
            value={component}
            exclusive
            onChange={handleComponent}
            aria-label="text alignment"
            className={classes.center}
          >
            {componentInfo.componentsAvailable
              .sort()
              .slice(0, 8)
              .map((user) => (
                <ToggleButton value={user} aria-label="left aligned">
                  {user}
                </ToggleButton>
              ))}
          </StyledToggleButtonGroup>
          <StyledToggleButtonGroup
            size="small"
            value={component}
            exclusive
            onChange={handleComponent}
            aria-label="text alignment"
            className={classes.center}
          >
            {componentInfo.componentsAvailable.slice(8).map((user) => (
              <ToggleButton value={user} aria-label="left aligned">
                {user}
              </ToggleButton>
            ))}
            <ToggleButton
              value="new"
              aria-label="left aligned"
              style={{
                backgroundColor: colors.blue[700],
                color: colors.grey[50],
              }}
            >
              <AddRounded />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </div>
      )}
      <Divider className={classes.divider} />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Toolbar;
