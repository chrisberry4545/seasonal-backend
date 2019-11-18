import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IDbRegionToSeasonAndFoodMap extends IAirtableBaseRecord {
  name: string;
  region: string;
  food: string[];
  season: string[];
}
