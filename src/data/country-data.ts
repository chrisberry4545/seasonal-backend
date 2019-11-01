import { ICountry } from '@chrisb-dev/seasonal-shared';
import { COUNTRY_CODES } from './country-codes.enum';

export const COUNTRY_DATA: ICountry[] = [
  {
    id: 'GBR',
    name: 'Great Britain & Ireland',
    regions: [
      {
        code: COUNTRY_CODES.GREAT_BRITAIN,
        latLng: {
          lat: 51.5074,
          lng: -0.118092
        },
        name: 'Great Britain & Ireland'
      }
    ]
  },
  {
    id: 'AUS',
    name: 'Australia',
    regions: [
      {
        code: COUNTRY_CODES.AUSTRALIA_BRISBANE,
        latLng: {
          lat: -27.4698,
          lng: 153.0251
        },
        name: 'Brisbane'
      },
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
