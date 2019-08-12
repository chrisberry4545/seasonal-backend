import {
    Router,
    Request,
    Response
  } from 'express';
import {
  fetchAllSeasonsWithRecipes,
  fetchFilteredSeasonsWithRecipes
} from '../../fetch-data';
import {
  getCountryCodeFromQueryParams,
  getIsVegetarianFromQueryParams,
  getIsVeganFromQueryParams
} from '../utils/get-query-params';

export const seasonWithRecipesApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    const countryCode = getCountryCodeFromQueryParams(req);
    try {
      const result = await fetchAllSeasonsWithRecipes(countryCode);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get('/:seasonIndex', async (req: Request, res: Response) => {
    const { seasonIndex } = req.params;
    const isVegetarian = getIsVegetarianFromQueryParams(req);
    const isVegan = getIsVeganFromQueryParams(req);
    const countryCode = getCountryCodeFromQueryParams(req);
    try {
      const result = await fetchFilteredSeasonsWithRecipes(
        seasonIndex,
        isVegetarian,
        isVegan,
        countryCode
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
