import { ICountry } from '@chrisb-dev/seasonal-shared';
import { COUNTRY_CODES } from './country-codes.enum';

export const COUNTRY_DATA: ICountry[] = [
  {
    id: 'UK',
    name: 'United Kingdom',
    regions: [{
      code: COUNTRY_CODES.UNITED_KINGDOM,
      name: 'United Kingdom'
    }]
  },
  {
    id: 'AUS',
    name: 'Australia',
    regions: [{
      code: COUNTRY_CODES.AUSTRALIA_PERTH,
      name: 'Perth'
    }, {
      code: COUNTRY_CODES.AUSTRALIA_SYDNEY,
      name: 'Sydney'
    }]
  }
];
