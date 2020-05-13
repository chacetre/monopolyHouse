import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  CardHeader,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  container: {
    maxHeight: 740
  },
  headerTitle: {
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    marginTop: 10
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const TableSelector = props => {
  const { className, listTable, onChange, componentsExisted, ...rest } = props;

  const classes = useStyles();
  const [componentsInfo, setComponentsInfo] = useState({});

  const handleChange = (event, user, keyName) => {
    onChange(event, user, keyName);
  };

  useEffect(() => {
    console.log('component tableGE', listTable);
    if (listTable !== undefined) {
      const index = Object.keys(listTable).findIndex(
        p => p.attr1 == 'typeAvailable'
      );
      Object.keys(listTable).slice(index);
      setComponentsInfo(listTable);
    }
  }, [listTable]);

  return (
    <Grid container spacing={3} className={classes.content}>
      {Object.keys(componentsInfo).map((keyName, i) => (
        <Grid item xs={12 / Object.keys(listTable).length + 1}>
          {keyName !== 'typeAvailable' && (
            <Card {...rest} className={clsx(classes.root, className)}>
              {keyName !== 'values' && (
                <CardHeader title={keyName} style={{ textAlign: 'center' }} />
              )}
              <CardContent className={classes.content}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Valeur</TableCell>
                        <TableCell>Quantité</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(componentsInfo[keyName]).map(user => (
                        <StyledTableRow>
                          <StyledTableCell>{user.label}</StyledTableCell>
                          <StyledTableCell>
                            <TextField
                              variant="outlined"
                              size="small"
                              name={user.value}
                              onChange={(event) => handleChange(event,user, keyName)}
                              value={
                                componentsExisted[user.value] !== undefined
                                  ? componentsExisted[user.value].quantity
                                  : ''
                              }
                              type="number"
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

TableSelector.propTypes = {
  className: PropTypes.string,
  listTable: PropTypes.object
};

export default TableSelector;
