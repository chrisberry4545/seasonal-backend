const { Router } = require('express');

const {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonName
} = require('./../fetch-data');

module.exports = (router = new Router()) => {
  router.get('/', async (req, res) => {
    const results = await fetchAllSeasonData();
    return res.json(results);
  });
  router.get('/:seasonName', async (req, res) => {
    const { seasonName } = req.params;
    const result = await fetchSeasonDataBySeasonName(seasonName);
    return res.json(result);
  });
  return router;
};
