import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  CardHeader,
  TextField,
} from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import SaveRounded from "@material-ui/icons/SaveRounded";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteOutlineRounded from "@material-ui/icons/DeleteOutlineRounded";
import { saveStockInDataBase, deleteValueInDataBase } from "../../../../request/stockAPI";
import NewValue from "../AddElements/NewValueModal";
import { red } from "@material-ui/core/colors";

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const StockInfo = (props) => {
  const {
    className,
    groupComponents,
    nameGroup,
    nameParent,
    isModifyNSave,
    ...rest
  } = props;

  const classes = useStyles();

  const [modify, setModify] = useState(false);
  const [openNewValue, setOpenNewValue] = useState(false);
  const [stockComponents, setStockComponents] = useState([]);

  function handleModifyStock(event) {
    event.persist();
    setStockComponents((prevFormState) => ({
      ...prevFormState,
      [event.target.id]: {
        ...prevFormState[event.target.id],
        stock: event.target.value,
      },
    }));

    isModifyNSave(true);
  }

  function handleModify() {
    setModify(true);
  }

  function handleSave() {
    saveStockInDataBase(nameParent, nameGroup, stockComponents);
    setModify(false);
    isModifyNSave(false);
  }

  function handleAddValue() {
    setOpenNewValue(true);
  }

  function handleDelete(event, index){
    deleteValueInDataBase(nameParent, nameGroup, index)
  }

  useEffect(() => {
    if (groupComponents !== undefined) {
      setStockComponents(groupComponents);
    }
  }, [groupComponents]);
  return (
    <>
      <NewValue
        component={{
          name: nameParent,
          type: nameGroup,
          length: Object.values(stockComponents).length,
        }}
        onClose={(color) => {
          setOpenNewValue(false);
        }}
        open={openNewValue}
      />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          title={nameGroup}
          style={{ textAlign: "center" }}
          action={
            <>
              {!modify && (
                <IconButton aria-label="settings" onClick={handleModify}>
                  <EditRounded />
                </IconButton>
              )}
              {modify && (
                <IconButton aria-label="settings" onClick={handleSave}>
                  <SaveRounded />
                </IconButton>
              )}
              <IconButton aria-label="settings" onClick={handleAddValue}>
                <AddRounded />
              </IconButton>
            </>
          }
        />
        <CardContent className={classes.content}>
          <TableContainer className={classes.container}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Valeur</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(stockComponents).sort((a, b) => (a.label > b.label) ? 1 : -1).map((user, index) => (
                  <StyledTableRow>
                    <StyledTableCell>{user.label}</StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        id={index}
                        onChange={handleModifyStock}
                        disabled={!modify}
                        value={user.stock}
                      />
                    </StyledTableCell>

                    <StyledTableCell>
                      {modify && (
                        <IconButton size="small" onClick={(event) => handleDelete(event, index)}>
                          <DeleteOutlineRounded style={{ color: red[500] }} />
                        </IconButton>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

StockInfo.propTypes = {
  className: PropTypes.string,
  groupComponents: PropTypes.object,
};

export default StockInfo;
