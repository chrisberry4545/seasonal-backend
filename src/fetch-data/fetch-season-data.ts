import {
  getAllSeasonData,
  getSeasonDataBySeasonIndex,
  hydrateSeasonData,
  sortHydratedSeasonData
} from '../data-access';

import {
  Cache
} from '../cache';

import { IBaseSeason, IHydratedSeason } from '@chrisb-dev/seasonal-shared';

const allSeasonDataCache = new Cache<IBaseSeason[]>();
const allSeasonDataCacheKey = 'seasons';

const singleSeasonCache = new Cache<IHydratedSeason>();
const singleSeasonCacheKey = 'single-season';

export const fetchAllSeasonData = async (): Promise<IBaseSeason[]> => {
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
): Promise<IHydratedSeason> => {
  const cacheKey = `${singleSeasonCacheKey}:${seasonIndex}`;
  const cachedSeasonData = singleSeasonCache.get(cacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const result = await getSeasonDataBySeasonIndex(seasonIndex);
  const hydratedResult = await hydrateSeasonData(result);
  const sortedResult = sortHydratedSeasonData(hydratedResult);
  singleSeasonCache.set(cacheKey, sortedResult);
  return sortedResult;
};
