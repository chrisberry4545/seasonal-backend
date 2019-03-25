import {
  Router
} from 'express';

import {
  foodApi
} from './food-api.v1';

import {
  seasonApi
} from './season-api.v1';

export const v1Api = (router = Router()) => {
  router.use(
    `/${process.env.V1_ENDPOINT}/` +
      process.env.SEASON_DATA_ENDPOINT,
    seasonApi()
  );
  router.use(
    `/${process.env.V1_ENDPOINT}/` +
      process.env.FOOD_DATA_ENDPOINT,
    foodApi()
  );
  return router;
};
