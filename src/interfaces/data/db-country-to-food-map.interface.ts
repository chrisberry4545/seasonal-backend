import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IDbCountryToFoodNameMap extends IAirtableBaseRecord {
  name: string;
  country: string;
  food: string;
}
