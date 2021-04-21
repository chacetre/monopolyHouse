import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const gray = colors.grey[400]

export default {
  black,
  white,
  gray,
  primary: {
    contrastText: white,
    dark: '#8da1c7',
    main: '#BED2FA',
    light: '#f1ffff'
  },
  secondary: {
    contrastText: white,
    dark: '#001561',
    main: '#3662C1',
    light: '#708ff4'
  },
  action: {
    contrastText: white,
    dark: colors.amber[800],
    main: colors.amber[600],
    light: colors.amber["A100"]
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
