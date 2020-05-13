import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
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
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TableSelector from './TableSelector';
import { saveNewPedalsInDataBase } from '../../../request/pedalsAPI';
import { getStockDataBase } from '../../../request/stockAPI';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: '60%',
    maxHeight: '90%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    margin: 10
  }
}));

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(1),
    border: 'none',
    background: theme.palette.background.default,
    padding: theme.spacing(0, 3),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);

function AddPedalModal({
  open,
  onClose,
  className,
  index,
  pedalInformations,
  ...rest
}) {
  const classes = useStyles();

  const [componentCurrent, setComponentCurrent] = useState('resistor');
  const [componentsList, setComponentsList] = useState([]);
  const [pedalCurrent, setPedalCurrent] = useState({});
  const [indexCurrentPedal, setIndexCurrentPedal] = useState(0);

  function saveInDataBase(index, pedalInformationsComplet) {
    saveNewPedalsInDataBase(index, pedalInformationsComplet);
  }

  const handleChange = (event, user, keyName) => {
 event.persist();
    console.log("event change",event.target.value );
    setPedalCurrent(prevFormState => ({
      ...prevFormState,
      components: {
        ...prevFormState.components,
        [user.value]: {
          label: user.label,
          path: `${componentCurrent}/${keyName}/${user.value}`,
          quantity: event.target.value >= 0 ? event.target.value : 0
        }
      }
    }));
  };

  const handleChangeName = event => {
    event.persist();
    setPedalCurrent(prevFormState => ({
      ...prevFormState,
      title: event.target.value
    }));
  };

  const handleComponent = (event, newComponent) => {
    setComponentCurrent(newComponent);
  };

  const cancelClose = () => {
    onClose();
  };

  const saveClose = () => {
    console.log('pedalCurrent', pedalCurrent);
    const today = new Date();

    let pedalScheme = {
      ...pedalCurrent,
      totalMade: 0,
      createdAt:
        today.getDate() +
        '/' +
        (today.getMonth() + 1) +
        '/' +
        today.getFullYear(),
      id: indexCurrentPedal
    };

    if (pedalInformations !== undefined) {
      pedalScheme = {
        ...pedalScheme,
        id: pedalInformations.id
      };
      console.log('save scheme', pedalScheme);
      saveInDataBase(pedalInformations.id, pedalScheme);
    } else {
      console.log('save scheme', pedalScheme);
      saveInDataBase(indexCurrentPedal, pedalScheme);
    }

    // snackbar ok enregistrer
    onClose();
  };

  useEffect(() => {
    if (pedalInformations !== undefined) {
      console.log('index modal pedal info', pedalInformations);
      setPedalCurrent(pedalInformations);
    }
  }, [pedalInformations]);

  useEffect(() => {
    console.log('index modal from new', index);
    setIndexCurrentPedal(index);
  }, [index]);

  useEffect(() => {
    getStockDataBase(response => {
      setComponentsList(response);
    });
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader
            title="Ajouter une nouvelle pédale"
            action={
              <>
                <Button onClick={cancelClose}>Close</Button>
                <Button color="primary" onClick={saveClose} variant="contained">
                  Save
                </Button>
              </>
            }
          />
          <Divider />
          <CardContent>
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Nom de la pédale"
              placeholder="hello"
              name="namePedal"
              onChange={handleChangeName}
              value={pedalCurrent.title || ''}
            >
              Stock
            </TextField>
            <Divider className={classes.divider} />
            <StyledToggleButtonGroup
              size="small"
              value={componentCurrent}
              exclusive
              onChange={handleComponent}
              aria-label="text alignment"
              className={classes.center}
            >
              {componentsList.componentsAvailable !== undefined &&
                componentsList.componentsAvailable
                  .slice(6, componentsList.componentsAvailable.length)
                  .map(user => (
                    <ToggleButton value={user} aria-label="left aligned">
                      {user}
                    </ToggleButton>
                  ))}
            </StyledToggleButtonGroup>
            <StyledToggleButtonGroup
              size="small"
              value={componentCurrent}
              exclusive
              onChange={handleComponent}
              aria-label="text alignment"
              className={classes.center}
            >
              {componentsList.componentsAvailable !== undefined &&
                componentsList.componentsAvailable.slice(0, 6).map(user => (
                  <ToggleButton value={user} aria-label="left aligned">
                    {user}
                  </ToggleButton>
                ))}
            </StyledToggleButtonGroup>
            <TableSelector
              listTable={componentsList.componentsStock[componentCurrent]}
              componentsExisted={pedalCurrent.components || {}}
              onChange={handleChange}
            />
          </CardContent>
          <Divider />
        </form>
      </Card>
    </Modal>
  );
}

AddPedalModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

AddPedalModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default AddPedalModal;
