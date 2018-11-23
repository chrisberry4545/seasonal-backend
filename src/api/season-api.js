const { Router } = require('express');

const {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonIndex
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
  router.get('/:seasonIndex', async (req, res) => {
    const { seasonIndex } = req.params;
    try {
      const result = await fetchSeasonDataBySeasonIndex(seasonIndex);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
