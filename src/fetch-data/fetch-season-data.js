const {
  getAllSeasonData,
  getSeasonDataBySeasonIndex,
  hydrateSeasonData
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
  seasonCache.set(seasonCacheKey, hydratedResults);
  return hydratedResults;
};

const fetchSeasonDataBySeasonIndex = async (seasonIndex) => {
  const cacheKey = `${seasonCacheKey}:${seasonIndex}`;
  const cachedSeasonData = seasonCache.get(cacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const result = await getSeasonDataBySeasonIndex(seasonIndex);
  const hydratedResult = hydrateSeasonData(result);
  seasonCache.set(cacheKey, hydratedResult);
  return hydratedResult;
};

module.exports = {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonIndex
};
