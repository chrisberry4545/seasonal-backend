import {
  Router,
  Request,
  Response
} from 'express';

import {
  fetchAllSeasonData,
  fetchSeasonDataBySeasonIndex
} from '../fetch-data';

export const seasonApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const results = await fetchAllSeasonData();
      return res.json(results);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get('/:seasonIndex', async (req: Request, res: Response) => {
    const { seasonIndex } = req.params;
    try {
      const result = await fetchSeasonDataBySeasonIndex(seasonIndex);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
