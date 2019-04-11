import {
  Router
} from 'express';

import {
  foodApi
} from './food-api.v1';

import {
  seasonApi
} from './season-api.v1';

import {
  seasonWithFoodApi
} from './season-with-food-api.v1';
import {
  V1_ENDPOINT,
  SEASON_DATA_ENDPOINT,
  FOOD_DATA_ENDPOINT,
  SEASON_WITH_FOOD_ENDPOINT
} from '../../config';

export const v1Api = (router = Router()) => {
  router.use(
    `/${V1_ENDPOINT}/${SEASON_DATA_ENDPOINT}`,
    seasonApi()
  );
  router.use(
    `/${V1_ENDPOINT}/${FOOD_DATA_ENDPOINT}`,
    foodApi()
  );
  router.use(
    `/${V1_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`,
    seasonWithFoodApi()
  );
  return router;
};
