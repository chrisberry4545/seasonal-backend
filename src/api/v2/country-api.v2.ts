import {
  Router,
  Request,
  Response
} from 'express';
import { fetchAllCountryData } from '../../fetch-data/fetch-country-data';

export const countryApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const result = await fetchAllCountryData();
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
