import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import mockData from "./data";
import TableStockComponent from "./components/TableStock/TableStockComponent";
import Toolbar from "./components/Toolbar";
import ImportExternal from "./components/ImportExternal";
import Firebase from "firebase";
import { getStockDataBase } from "../../request/stockAPI";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const Stock = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [componentDisplay, setComponengDisplay] = useState("aop");
  const [modifiyngStock, setModifiyngStock] = useState(false);

  const getUserData = () => {
    getStockDataBase((response) => {
      setData(response);
    });
  };

  function handleComponentChange(newComponent) {
    setComponengDisplay(newComponent);
  }

  function isModifyNSave(information) {
    setModifiyngStock(information);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={classes.root}>
      <ImportExternal/>
      {data.componentsStock !== undefined && (
        <Toolbar
          components={data}
          onChange={handleComponentChange}
          modifiyngStock={modifiyngStock}
        />
      )}
      <div className={classes.content}>
        {data.componentsStock !== undefined && (
          <TableStockComponent
            listTable={data.componentsStock[componentDisplay]}
            nameParent={componentDisplay}
            isModifyNSave={isModifyNSave}
          />
        )}
      </div>
    </div>
  );
};

export default Stock;
