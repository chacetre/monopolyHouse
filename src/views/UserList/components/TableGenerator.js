import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
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
  searchInput: {
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

const TableGenerator = props => {
  const { className, listTable, ...rest } = props;

  const classes = useStyles();
  const [componentInfo, setComponentInfo] = useState({});

  useEffect(() => {
    console.log('component tableGE', listTable);
    if (listTable !== undefined) {
      const index = Object.keys(listTable).findIndex(
        p => p.attr1 == 'typeAvailable'
      );
      Object.keys(listTable).slice(index);
      setComponentInfo(listTable);
    }
  }, [listTable]);

  return (
    <Grid container spacing={3}>
      {Object.keys(componentInfo).map((keyName, i) => (
        <Grid item xs={12 / Object.keys(componentInfo).length + 1}>
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
                        <TableCell>Stock</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {componentInfo[keyName].map(user => (
                        <StyledTableRow>
                          <StyledTableCell>{user.label}</StyledTableCell>
                          <StyledTableCell>{user.stock}</StyledTableCell>
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

TableGenerator.propTypes = {
  className: PropTypes.string,
  listTable: PropTypes.object
};

export default TableGenerator;