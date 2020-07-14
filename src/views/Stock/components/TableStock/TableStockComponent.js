import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";

import AddRounded from "@material-ui/icons/AddRounded";
import StockInfo from "./StockInfo";
import NewElementModal from "../AddElements/NewElementModal";

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
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  container: {
    maxHeight: 740,
  },
  headerTitle: {
    paddingBottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TableStockComponent = (props) => {
  const { className, listTable, nameParent, isModifyNSave, ...rest } = props;

  const classes = useStyles();
  const [componentInfo, setComponentInfo] = useState({});
  const [openAddElement, setOpenAddElement] = useState(false);
  const sizeGrid = 12 / (Object.keys(listTable).length - 1);
  

  function handleAddElement() {
    setOpenAddElement(true);
  }

  useEffect(() => {
    console.log("component tableGE", listTable);
    if (listTable !== undefined) {
      const index = Object.keys(listTable).findIndex(
        (p) => p.attr1 == "typeAvailable"
      );
      Object.keys(listTable).slice(index);
      setComponentInfo(listTable);
    }
  }, [listTable]);

  return (
    <Grid container spacing={3}>
      <NewElementModal
        component={{ name: nameParent, length: Object.keys(listTable).length }}
        onClose={(color) => {
          setOpenAddElement(false);
        }}
        open={openAddElement}
      />
      <Grid item xs={11}>
        <Grid container spacing={3}>
          {Object.keys(componentInfo).map((keyName, i) => (
            <>
              {keyName !== "typeAvailable" && (
                <Grid item xs={sizeGrid === 12 ? 6 : sizeGrid}>
                  <StockInfo
                    groupComponents={Object.values(componentInfo[keyName])}
                    nameGroup={keyName}
                    nameParent={nameParent}
                    isModifyNSave={isModifyNSave}
                  />
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddElement}
        >
          <AddRounded />
        </Button>
      </Grid>
    </Grid>
  );
};

TableStockComponent.propTypes = {
  className: PropTypes.string,
  listTable: PropTypes.object,
};

export default TableStockComponent;
