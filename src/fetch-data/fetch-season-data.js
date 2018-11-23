const {
  getAllSeasonData,
  hydrateSeasonData
} = require('./../data-access');

const {
  Cache
} = require('./../cache/index');

const seasonCache = new Cache();
const seasonCacheKey = 'seasons';

const fetchSeasonData = async () => {
  const cachedSeasonData = seasonCache.get(seasonCacheKey);
  if (cachedSeasonData) {
    return cachedSeasonData;
  }
  const results = await getAllSeasonData();
  const hydratedResults = await hydrateSeasonData(results);
  seasonCache.set(seasonCacheKey, hydratedResults);
  return hydratedResults;
};

module.exports = {
  fetchSeasonData
};
