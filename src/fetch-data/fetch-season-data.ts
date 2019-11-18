import {
  getAllSeasonData
} from '../data-access';

import {
  Cache,
  cacheFunctionResponse
} from '../cache';
import { IDbSeason } from '../interfaces';

const allSeasonDataCache = new Cache<IDbSeason[]>();
const allSeasonDataCacheKey = 'seasons';

export const fetchAllSeasonData = cacheFunctionResponse(
  allSeasonDataCache,
  allSeasonDataCacheKey,
  async (): Promise<IDbSeason[]> => await getAllSeasonData()
);
