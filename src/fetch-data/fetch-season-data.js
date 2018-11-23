const {
  getAllSeasonData,
  getSeasonDataBySeasonName,
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

const fetchSeasonDataBySeasonName = async (seasonName) => {
  const cacheKey = `${seasonCacheKey}:${seasonName}`;
  const cachedSeasonData = seasonCache.get(cacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const result = await getSeasonDataBySeasonName(seasonName);
  const hydratedResult = hydrateSeasonData(result);
  seasonCache.set(cacheKey, hydratedResult);
  return hydratedResult;
};

module.exports = {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonName
};
