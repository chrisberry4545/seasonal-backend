const { Router } = require('express');

const {
  getAllSeasonData,
  hydrateSeasonData
} = require('./../data');

module.exports = (router = new Router()) => {
  router.get('/', async (req, res) => {
    const results = await getAllSeasonData();
    const hydratedResults = await hydrateSeasonData(results);
    return res.json(hydratedResults);
  });
  return router;
};
