import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import { getPedalsDataBase } from 'request/pedalsAPI';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [dataPedals, setDataPedals] = useState({});
  const [pedalsList, setPedalsList] = useState([]);

  const [data, setData] = useState({
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.error.main
        ]
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  });

  function generateRandomColor() {
    const randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    console.log("random color",randomColor);
    return randomColor;
  }

  function formateData() {
    const newArray = [];
    const values = [];
    const colors = [];
    const labels = [];

    Object.values(dataPedals).forEach(element => {
      const color = generateRandomColor();
      const scheme = {
        title: element.title,
        value: element.totalMade,
        color: color
      };
      values.push(element.totalMade);
      colors.push(color);
      labels.push(element.title);
      newArray.push(scheme);
    });

    console.log('newArray', newArray);
    setPedalsList(newArray);

    setData({
      datasets: [
        {
          data: values,
          backgroundColor: colors
        }
      ],
      labels: labels
    })
  }

  useEffect(() => {
    formateData();
  }, [dataPedals]);

  useEffect(() => {
    getPedalsDataBase(response => {
      console.log('element', response);
      setDataPedals(response);
    });
  }, []);

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Pédales réaliser"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {pedalsList.map(pedal => (
            <div className={classes.device} key={pedal.title}>
              <Typography variant="body1">{pedal.title}</Typography>
              <Typography style={{ color: pedal.color }} variant="h2">
                {pedal.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
