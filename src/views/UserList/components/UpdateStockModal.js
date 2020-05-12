import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  Select,
  InputLabel
} from '@material-ui/core';
import CloseRounded from '@material-ui/icons/CloseRounded';
import { saveStockSousTypeInDataBase } from '../../../request/stockAPI';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function UpdateStockModal({ open, onClose, composent, className, ...rest }) {
  const classes = useStyles();
  const [stock, setStock] = useState(0);
  const [value, setValue] = useState(-1);
  const [type, setType] = useState('led');
  const [sousType, setSousType] = useState();
  const [composentL, setComposent] = useState({});
  const [disableValeur, setDisableValeur] = useState(true);

  function saveInDataBase() {
    saveStockSousTypeInDataBase(type, sousType, value, stock);
  }

  const handleChangeValeur = event => {
    setValue(event.target.value);
    const stock = composentL.componentsStock[type][sousType][event.target.value].stock;
    setStock(stock);
  };

  const handleChangeType = event => {
    let values = event.target.value.split('.');
    console.log('values', values);

    setType(values[0]);
    if (values.length > 1) {
      setSousType(values[1]);
      setStock()
    }

    else setSousType(values[0]);

    console.log('event', values);

    setDisableValeur(false);
  };

  const handleStockUpdate = event => {
    setStock(event.target.value);
  };

  const cancelClose = () => {
    onClose();
  };

  const saveClose = () => {
    saveInDataBase();
    onClose();
  };

  const saveOtherUpdateClose = () => {
    saveInDataBase();
    setValue('');
    setStock(0);
  };

  useEffect(() => {
    console.log('composent update', composent);
    setComposent(composent);
  }, [composent]);

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title="Mise à jour du stock"
            action={
              <Button onClick={cancelClose}>
                <CloseRounded />
              </Button>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Typography>Composant</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Stock</Typography>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  fullWidth
                  values={type}
                  onChange={handleChangeType}
                >
                  <Select native defaultValue="" id="grouped-native-select" name='type'>
                    {composentL.componentsAvailable !== undefined &&
                      composentL.componentsAvailable.map(option => (
                        <>
                          {composentL.componentsStock[option].typeAvailable !==
                            undefined &&
                            composentL.componentsStock[option].typeAvailable
                              .length === 1 && (
                              <option value={option}>
                                {option.toUpperCase()}
                              </option>
                            )}
                          {composentL.componentsStock[option].typeAvailable !==
                            undefined &&
                            composentL.componentsStock[option].typeAvailable
                              .length !== 1 && (
                              <optgroup label={option.toUpperCase()}>
                                {composentL.componentsStock[
                                  option
                                ].typeAvailable.map(type => (
                                  <option value={`${option}.${type}`}>
                                    {type.toUpperCase()}
                                  </option>
                                ))}
                              </optgroup>
                            )}
                        </>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-select-currency"
                  select
                  disabled={disableValeur}
                  fullWidth
                  value={value}
                  onChange={handleChangeValeur}
                  variant="outlined"
                  size="small"
                >
                  {composentL.componentsStock !== undefined &&
                    sousType !== undefined &&
                    Object.values(composentL.componentsStock[type][sousType]).map((option, index) => (
                      <MenuItem key={index} value={index}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="stock"
                  onChange={handleStockUpdate}
                  value={stock}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button
              color="primary"
              onClick={saveOtherUpdateClose}
              variant="contained"
            >
              Update une autre
            </Button>
            <Button color="primary" onClick={saveClose} variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
}

UpdateStockModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

UpdateStockModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default UpdateStockModal;
