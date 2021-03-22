import {getCategoryIcon} from '../utils/Functions';
import Constants from './Constants';

const InputCategories = [
  {
    value: 'all',
    label: 'Svi Podaci',
  },
  {
    value: 'fuel',
    label: 'Gorivo',
    icon: () => getCategoryIcon('fuel', Constants.gray, 20),
  },
  {
    value: 'registration',
    label: 'Registracija i Osiguranje',
    icon: () => getCategoryIcon('registration', Constants.gray, 20),
  },
  {
    value: 'maintainance',
    label: 'Održavanje i Popravke',
    icon: () => getCategoryIcon('maintainance', Constants.gray, 20),
  },
  {
    value: 'crashes',
    label: 'Oštećenja',
    icon: () => getCategoryIcon('crashes', Constants.gray, 20),
  },
  {
    value: 'equipment',
    label: 'Oprema i Ostalo',
    icon: () => getCategoryIcon('equipment', Constants.gray, 20),
  },
];

export default InputCategories;
