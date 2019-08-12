import {
  Router,
  Request,
  Response
} from 'express';
import { fetchAllSeasonsWithFood, fetchSeasonWithFood } from '../../fetch-data';
import { getCountryCodeFromQueryParams } from '../utils/get-query-params';

export const seasonWithFoodApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    const countryCode = getCountryCodeFromQueryParams(req);
    try {
      const result = await fetchAllSeasonsWithFood(countryCode);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get('/:seasonIndex', async (req: Request, res: Response) => {
    const { seasonIndex } = req.params;
    const countryCode = getCountryCodeFromQueryParams(req);
    try {
      const result = await fetchSeasonWithFood(seasonIndex, countryCode);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
