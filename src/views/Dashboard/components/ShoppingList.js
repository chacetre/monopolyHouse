import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from "@material-ui/core";
import WarningRounded from "@material-ui/icons/WarningRounded";

import { getStockDataBase } from "../../../request/stockAPI";
import { getPedalsDataBase } from "request/pedalsAPI";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const statusColors = {
  delivered: "success",
  pending: "info",
  refunded: "danger",
};

const ShoppingList = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [data, setData] = useState({});
  const [listLowStock, setListLowStock] = useState([]);
  const [listComponentsUsed, setListComponentsUsed] = useState([]);

  function getStockLow() {
    if (
      data === undefined ||
      data === null ||
      data.componentsStock === undefined
    ) {
      return;
    }

    const listComponentLow = [];

    listComponentsUsed.forEach((componentUsed) => {
      
      const pathSplit = componentUsed.split('/');
      const list = data.componentsStock[pathSplit[0]][pathSplit[1]];

      if (list == undefined){
        return;
      }
      
      list.forEach((element) => {
        if (element.value == pathSplit[2]) {
          if (parseInt(element.stock) < parseInt(element.criticalMin)) {
            const scheme = {
              type: pathSplit[0].toUpperCase(),
              value: element.label,
              stock: element.stock,
            };

            listComponentLow.push(scheme);
          }
        }
      });
    });

    setListLowStock(listComponentLow);
  }

  function initComponentUsed(listPedals) {
    const listComponentUsed = [];

    listPedals.forEach((element) => {
      const components = element.components;
      Object.values(components).forEach((component) => {
        listComponentUsed.push(component.path);
      });
    });

    setListComponentsUsed(listComponentUsed);
  }

  useEffect(() => {
    getStockDataBase((response) => {
      setData(response);
    });

    getPedalsDataBase((response) => {
      initComponentUsed(response);
    });
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      getStockLow();
    }
  }, [data]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Liste de course" />
      <Divider />
      <CardContent className={classes.content}>
        
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Composant</TableCell>
                  <TableCell>Stock restant</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listLowStock.sort((a, b) => (a.type > b.type) ? 1 : -1).map((order) => (
                  <TableRow
                    hover
                    style={{
                      backgroundColor: order.stock == 0 ? "#ffebee" : "#ffffff",
                    }}
                  >
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.value}</TableCell>
                    <TableCell>{order.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        
      </CardContent>
    </Card>
  );
};

ShoppingList.propTypes = {
  className: PropTypes.string,
};

export default ShoppingList;
