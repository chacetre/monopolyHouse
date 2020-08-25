import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Button, Grid, colors, Divider, Dropzone, Typography } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import NewCompentModal from "./AddElements/NewCompentModal";

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

const ImportExternal = (props) => {
  const { className, onChange, components, modifiyngStock, ...rest } = props;

  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);
  const [jsonFile, setJsonFile] = useState({});

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileReader = new FileReader();
    const fileUploaded = event.target.files[0];

    fileReader.onload = function(progressEvent) {
      const stringData = JSON.parse(fileReader.result);
      console.log('stringData',stringData);
      setJsonFile(stringData);
    };
    fileReader.readAsText(fileUploaded, "UTF-8"); // fileReader.result -> String.
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Button variant="outlined" onClick={handleClick}>
        Update from musicDing
      </Button>
      <input
        type="file"
        accept=".txt"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      
    </div>
  );
};

ImportExternal.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default ImportExternal;
