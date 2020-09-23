import defaultColors from './colors';
import colorfn from 'color';
import { increaseIntensivity, decreaseIntensivity, grayscaleCompatible } from '../utils/colors';

const colors = {
  ...defaultColors,

  primary: defaultColors.specialBlue,

  primaryDark: defaultColors.blueDark,
  font: '#dddddd',
  fontDark: '#919191',
  background: '#29282A',
  mainBackground: '#1E1E1F',
  border: '#323234',
  hover: defaultColors.specialBlue,
  shadow: defaultColors.specialBlueBack,
};

const navigationSidebar  = {
  row: {
    active: defaultColors.specialBlueBack,
  },
};


export default {
  colors: colors,
  navigationSidebar: navigationSidebar,
};
