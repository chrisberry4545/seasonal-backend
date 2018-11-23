const { Router } = require('express');

const {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonName
} = require('./../fetch-data');

module.exports = (router = new Router()) => {
  router.get('/', async (req, res) => {
    try {
      const results = await fetchAllSeasonData();
      return res.json(results);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get('/:seasonName', async (req, res) => {
    const { seasonName } = req.params;
    try {
      const result = await fetchSeasonDataBySeasonName(seasonName);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
