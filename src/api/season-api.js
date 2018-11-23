const { Router } = require('express');

const {
  fetchSeasonData
} = require('./../fetch-data');

module.exports = (router = new Router()) => {
  router.get('/', async (req, res) => {
    const results = await fetchSeasonData();
    return res.json(results);
  });
  return router;
};
