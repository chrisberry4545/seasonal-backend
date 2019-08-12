import {
  Router,
  Request,
  Response
} from 'express';

import {
  fetchAllSeasonData
} from '../../fetch-data';
import { getCountryCodeFromQueryParams } from '../utils/get-query-params';

export const seasonApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    const countryCode = getCountryCodeFromQueryParams(req);
    try {
      const results = await fetchAllSeasonData(countryCode);
      return res.json(results);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
