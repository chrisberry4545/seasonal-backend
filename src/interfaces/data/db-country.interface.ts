import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IDbCountry extends IAirtableBaseRecord {
  name: string;
  regions: string[];
  countryToFoodNameMap: string[];
}
