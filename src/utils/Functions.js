export const getLogo = (brand) => {
  switch (brand) {
    case 'Volkswagen':
      return require('../assets/carLogos/volkswagen.png');
    case 'Renault':
      return require('../assets/carLogos/renault.png');
    case 'Tesla':
      return require('../assets/carLogos/tesla.png');
  }
};
