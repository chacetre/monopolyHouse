import palette from '../palette';

export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: palette.primary.light
    },
    '&$selected': {
      backgroundColor: palette.secondary.dark,
      color: palette.white,
      '&:hover': {
        backgroundColor: 'rgba(208, 208, 208, 0.30)',
      }
    },
    '&:first-child': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },
    '&:last-child': {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4
    }
  }
};