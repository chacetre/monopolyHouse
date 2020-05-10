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
  Switch,
  Button,
  FormControl,
  Select,
  FormControlLabel
} from '@material-ui/core';
import CloseRounded from '@material-ui/icons/CloseRounded';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  saveNewTypeInDataBase,
  saveNewValueInDataBase,
  saveNewSousTypeInDataBase
} from '../../../request/stockAPI';

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
  },
  toggleButton: {
    height: '100%'
  },
  div: {
    display: 'flex'
  },
  center: {
    marginBottom: 20
  },
  containerBottom: {
    marginTop: 20
  }
}));

function NewCompentModal({ open, onClose, composent, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [component, setComponent] = useState({});

  const handleChange = event => {
    event.persist();

    if (event.target.name === 'type') {
      setValues(prevValues => ({
        [event.target.name]: event.target.value
      }));
    } else {
      setValues(prevValues => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }));
    }
  };

  const saveNewValues = () => {
    let index = 0;
    if (values.Stype !== undefined) {
      index = composent.componentsStock[values.type][values.Stype].length;
    }

    const scheme = {
      label: values.label,
      value: values.value,
      stock: values.stock
    };
    saveNewValueInDataBase(values.type, values.Stype, scheme, index);
  };

  const saveNewType = () => {
    let index = composent.componentsAvailable.length;

    const scheme = {
      label: values.label,
      value: values.value,
      stock: values.stock
    };
    saveNewTypeInDataBase(values.newType, scheme, index);
  };

  const saveNewSousType = () => {
    let index = composent.componentsStock[values.type].typeAvailable.length;

    let newSousTypeValue = values.newType;
    if (values.newSType !== undefined) newSousTypeValue = values.newSType;

    const scheme = {
      label: values.label,
      value: values.value,
      stock: values.stock
    };
    saveNewSousTypeInDataBase(values.type, newSousTypeValue, scheme, index);
  };

  const cancelClose = () => {
    onClose();
  };

  const saveClose = () => {
    console.log('schema', values);

    if (values.type === 'newType') saveNewType();

    if (values.type !== 'newType' && values.Stype === 'newSType')
      saveNewSousType();

    if (values.type !== 'newType' && values.Stype !== 'newSType')
      saveNewValues();

    setValues({});
    onClose();
  };

  useEffect(() => {
    console.log('composent', composent);
    setComponent(composent);
  }, [composent]);

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title="Nouveau composant"
            action={
              <Button onClick={cancelClose}>
                <CloseRounded />
              </Button>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  name="type"
                  size="small"
                  fullWidth
                  values={values.type}
                  onChange={handleChange}
                >
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    name="type"
                  >
                    {component.componentsAvailable !== undefined &&
                      component.componentsAvailable.map(option => (
                        <>
                          <option value={option}>{option.toUpperCase()}</option>
                        </>
                      ))}
                    <option value={'newType'}>NOUVELLE CATEGORIE</option>
                  </Select>
                </FormControl>
              </Grid>
              {values.type === 'newType' && (
                <>
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-select-value"
                      label="new categorie"
                      name="newType"
                      fullWidth
                      value={values.newType}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-select-value"
                      label="new sous type"
                      name="newSType"
                      fullWidth
                      value={values.newSType}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3} />
                </>
              )}
              {values.type !== 'newType' && (
                <>
                  <Grid item xs={3}>
                    <FormControl
                      className={classes.formControl}
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="Stype"
                      values={values.Stype}
                      onChange={handleChange}
                    >
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        name="Stype"
                      >
                        {component.componentsStock !== undefined &&
                          values.type != undefined &&
                          component.componentsStock[
                            values.type
                          ].typeAvailable.map(option => (
                            <>
                              <option value={option}>
                                {option.toUpperCase()}
                              </option>
                            </>
                          ))}
                        <option value={'newSType'}>NOUVELLE CATEGORIE</option>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
              {values.Stype === 'newSType' && (
                <Grid item xs={3}>
                  <TextField
                    id="outlined-select-value"
                    label="new sous type"
                    name="newSType"
                    fullWidth
                    value={values.newSType}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              )}
              {values.Stype !== 'newSType' && <Grid item xs={6} />}
            </Grid>
            <Grid container spacing={1} className={classes.containerBottom}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-select-value"
                  label="Valeur"
                  name="value"
                  helperText="ex: twoOhm, threeNf"
                  fullWidth
                  value={values.value}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-select-value"
                  label="Label"
                  name="label"
                  helperText="Nom d'affichage"
                  fullWidth
                  value={values.label}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  name="stock"
                  label="Stock"
                  onChange={handleChange}
                  value={values.stock || 0}
                  variant="outlined"
                  size="small"
                  type="number"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button color="primary" onClick={saveClose} variant="contained">
              Ajouter
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
}

NewCompentModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

NewCompentModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default NewCompentModal;
