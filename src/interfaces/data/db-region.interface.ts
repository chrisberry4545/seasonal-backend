import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IDbRegion extends IAirtableBaseRecord {
  name: string;
  code: string;
  country: string[];
  regionToSeasonAndFoodMap: string;
  lat: number;
  lng: number;
}
