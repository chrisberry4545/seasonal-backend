import {
  Router,
  Request,
  Response
} from 'express';
import { fetchFoodDataWithFilteredRecipes } from '../../fetch-data';
import {
  getIsVegetarianFromQueryParams,
  getIsVeganFromQueryParams,
  getCountryCodeFromQueryParams
} from '../utils/get-query-params';

export const foodApi = (router = Router()) => {
  router.get('/:foodId', async (req: Request, res: Response) => {
    const { foodId } = req.params;
    const isVegetarian = getIsVegetarianFromQueryParams(req);
    const isVegan = getIsVeganFromQueryParams(req);
    const countryCode = getCountryCodeFromQueryParams(req);
    try {
      const result = await fetchFoodDataWithFilteredRecipes(
        foodId, isVegetarian, isVegan, countryCode
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
