import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography,
  colors,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RefreshIcon from "@material-ui/icons/Refresh";
import LensRounded from "@material-ui/icons/LensRounded";
import { getPedalsDataBase } from "request/pedalsAPI";
import {colorsChoice} from "data/colorData";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  chartContainer: {
    position: "relative",
    height: "300px",
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1),
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
}));

const GraphPedalsMade = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [dataPedals, setDataPedals] = useState({});
  const [pedalsList, setPedalsList] = useState([]);
  const colorBase = [colors.red, colors.green, colors.blue, colors.yellow];
  const colorNumber = [300, 400, 500, 600, 700, 800, 900];
  const [data, setData] = useState();

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomColor() {
    const indexRandom = getRandomIntInclusive(0, colorsChoice.length - 1)
    return colorsChoice[indexRandom];
  }

  function formateData() {
    const newArray = [];
    const values = [];
    const colors = [];
    const labels = [];

    Object.values(dataPedals).forEach((element) => {
      const color = generateRandomColor();
      const scheme = {
        title: element.title,
        value: element.totalMade,
        color: color,
      };
      values.push(element.totalMade);
      colors.push(color);
      labels.push(element.title);
      newArray.push(scheme);
    });

    setPedalsList(newArray);

    setData({
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
      labels: labels,
    });
  }

  useEffect(() => {
    formateData();
  }, [dataPedals]);

  useEffect(() => {
    getPedalsDataBase((response) => {
      setDataPedals(response);
    });
  }, []);

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
    },
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="Pédales réalisées"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {pedalsList.sort((a, b) => (a.value < b.value) ? 1 : -1).map((pedal)=> (
                  <TableRow key={pedal.title}>
                    <TableCell ><LensRounded style={{ color: pedal.color }} /></TableCell>
                    <TableCell >{pedal.title}</TableCell>
                    <TableCell align="right" >{pedal.value}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CardContent>
    </Card>
  );
};

GraphPedalsMade.propTypes = {
  className: PropTypes.string,
};

export default GraphPedalsMade;
