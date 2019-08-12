import { ICountry } from '@chrisb-dev/seasonal-shared';
import { COUNTRY_CODES } from './country-codes.enum';

export const COUNTRY_DATA: ICountry[] = [
  {
    name: 'United Kingdom',
    regions: [{
      code: COUNTRY_CODES.UNITED_KINGDOM,
      name: 'United Kingdom'
    }]
  },
  {
    name: 'Australia',
    regions: [{
      code: COUNTRY_CODES.AUSTRALIA_WESTERN_AUSTRALIA,
      name: 'Western Australia'
    }, {
      code: COUNTRY_CODES.AUSTRALIA_NEW_SOUTH_WALES,
      name: 'Northern Territories'
    }]
  }
];
