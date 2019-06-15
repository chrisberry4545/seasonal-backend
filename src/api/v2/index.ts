import {
  Router
} from 'express';

import {
  foodApi
} from './food-api.v2';

import {
  seasonApis
} from './seasons-api.v2';

import {
  seasonWithFoodApi
} from './season-with-food-api.v2';

import {
  seasonWithRecipesApi
} from './season-with-recipes-api.v2';

import {
  V2_ENDPOINT,
  SEASON_DATA_ENDPOINT,
  FOOD_DATA_ENDPOINT,
  SEASON_WITH_FOOD_ENDPOINT,
  SEASON_WITH_RECIPE_ENDPOINT
} from '../../config';

export const v2Api = (router = Router()) => {
  router.use(
    `/${V2_ENDPOINT}/${SEASON_DATA_ENDPOINT}`,
    seasonApis()
  );
  router.use(
    `/${V2_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`,
    seasonWithFoodApi()
  );
  router.use(
    `/${V2_ENDPOINT}/${SEASON_WITH_RECIPE_ENDPOINT}`,
    seasonWithRecipesApi()
  ),
  router.use(
    `/${V2_ENDPOINT}/${FOOD_DATA_ENDPOINT}`,
    foodApi()
  );
  return router;
};
