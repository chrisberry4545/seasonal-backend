import {
  getAllSeasonData
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';
import { IBaseSeason } from '@chrisb-dev/seasonal-shared';

const allSeasonDataCache = new Cache<IBaseSeason[]>();
const allSeasonDataCacheKey = 'seasons';

export const fetchAllSeasonData = cacheFunctionResponse(
  allSeasonDataCache,
  allSeasonDataCacheKey,
  async (): Promise<IBaseSeason[]> => await getAllSeasonData()
);
