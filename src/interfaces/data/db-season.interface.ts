import { IAirtableBaseRecord } from '@chrisb-dev/seasonal-shared';

export interface IDbSeason extends IAirtableBaseRecord {
  name: string;
  seasonIndex: number;
  regionToSeasonAndFoodMap: string[];
}
