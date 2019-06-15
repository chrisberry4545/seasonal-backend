import {
  Router,
  Request,
  Response
} from 'express';

import {
  fetchAllSeasonData
} from '../../fetch-data';

export const seasonApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const results = await fetchAllSeasonData();
      return res.json(results);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
