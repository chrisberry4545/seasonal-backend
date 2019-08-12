import {
  Router
} from 'express';

import {
  foodApi
} from './food-api.v2';

import {
  seasonApi
} from './season-api.v2';

import {
  seasonWithFoodApi
} from './season-with-food-api.v2';

import {
  seasonWithRecipesApi
} from './season-with-recipes-api.v2';

import { countryApi } from './country-api.v2';

import {
  V2_ENDPOINT,
  COUNTRY_ENDPOINT,
  SEASON_ENDPOINT,
  SEASON_WITH_FOOD_ENDPOINT,
  SEASON_WITH_RECIPES_ENDPOINT,
  FOOD_ENDPOINT
} from '../../config';

export const v2Api = (router = Router()) => {
  router.use(
    `/${V2_ENDPOINT}/${COUNTRY_ENDPOINT}`,
    countryApi()
  );
  router.use(
    `/${V2_ENDPOINT}/${SEASON_ENDPOINT}`,
    seasonApi()
  );
  router.use(
    `/${V2_ENDPOINT}/${SEASON_WITH_FOOD_ENDPOINT}`,
    seasonWithFoodApi()
  );
  router.use(
    `/${V2_ENDPOINT}/${SEASON_WITH_RECIPES_ENDPOINT}`,
    seasonWithRecipesApi()
  ),
  router.use(
    `/${V2_ENDPOINT}/${FOOD_ENDPOINT}`,
    foodApi()
  );
  return router;
};
