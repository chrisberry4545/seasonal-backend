import { ICountry } from '@chrisb-dev/seasonal-shared';
import { COUNTRY_CODES } from './country-codes.enum';

export const COUNTRY_DATA: ICountry[] = [
  {
    id: 'UK',
    name: 'United Kingdom',
    regions: [
      {
        code: COUNTRY_CODES.UNITED_KINGDOM,
        latLng: {
          lat: 51.5074,
          lng: -0.118092
        },
        name: 'United Kingdom'
      }
    ]
  },
  {
    id: 'AUS',
    name: 'Australia',
    regions: [
      {
        code: COUNTRY_CODES.AUSTRALIA_MELBOURNE,
        latLng: {
          lat: -37.840935,
          lng: 144.946457
        },
        name: 'Melbourne'
      },
      {
        code: COUNTRY_CODES.AUSTRALIA_PERTH,
        latLng: {
          lat: -31.953512,
          lng: 115.857048
        },
        name: 'Perth'
      },
      {
        code: COUNTRY_CODES.AUSTRALIA_SYDNEY,
        latLng: {
          lat: -33.865143,
          lng: 151.209900
        },
        name: 'Sydney'
      }
    ]
  }
];
