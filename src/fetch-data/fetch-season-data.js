const {
  getAllSeasonData,
  getSeasonDataBySeasonIndex,
  hydrateSeasonData,
  sortSeasonData
} = require('./../data-access');

const {
  Cache
} = require('./../cache/index');

const seasonCache = new Cache();
const seasonCacheKey = 'seasons';

const fetchAllSeasonData = async () => {
  const cachedSeasonData = seasonCache.get(seasonCacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const results = await getAllSeasonData();
  const hydratedResults = await hydrateSeasonData(results);
  const sortedResult = sortSeasonData(hydratedResults);
  seasonCache.set(seasonCacheKey, sortedResult);
  return sortedResult;
};

const fetchSeasonDataBySeasonIndex = async (seasonIndex) => {
  const cacheKey = `${seasonCacheKey}:${seasonIndex}`;
  const cachedSeasonData = seasonCache.get(cacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const result = await getSeasonDataBySeasonIndex(seasonIndex);
  const hydratedResult = await hydrateSeasonData(result);
  const sortedResult = sortSeasonData(hydratedResult);
  seasonCache.set(cacheKey, sortedResult);
  return sortedResult;
};

module.exports = {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonIndex
};
