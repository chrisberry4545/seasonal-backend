import {
  getAllSeasonData,
  getSeasonDataBySeasonIndex,
  hydrateSeasonData,
  sortSeasonData
} from '../data-access';

import {
  Cache
} from '../cache';

import { BaseSeason, HydratedSeason } from '@chrisb-dev/seasonal-shared';

const allSeasonDataCache = new Cache<BaseSeason[]>();
const allSeasonDataCacheKey = 'seasons';

const singleSeasonCache = new Cache<HydratedSeason>();
const singleSeasonCacheKey = 'single-season';

export const fetchAllSeasonData = async (): Promise<BaseSeason[]> => {
  const cachedSeasonData = allSeasonDataCache.get(allSeasonDataCacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const results = await getAllSeasonData();
  allSeasonDataCache.set(allSeasonDataCacheKey, results);
  return results;
};

export const fetchSeasonDataBySeasonIndex = async (
  seasonIndex: number
): Promise<HydratedSeason> => {
  const cacheKey = `${singleSeasonCacheKey}:${seasonIndex}`;
  const cachedSeasonData = singleSeasonCache.get(cacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const result = await getSeasonDataBySeasonIndex(seasonIndex);
  const hydratedResult = await hydrateSeasonData(result);
  const sortedResult = sortSeasonData(hydratedResult);
  singleSeasonCache.set(cacheKey, sortedResult);
  return sortedResult;
};
