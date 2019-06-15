import {
  Router,
  Request,
  Response
} from 'express';
import { fetchAllSeasonsWithFood, fetchSeasonWithFood } from '../../fetch-data';

export const seasonWithFoodApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const result = await fetchAllSeasonsWithFood();
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get('/:seasonIndex', async (req: Request, res: Response) => {
    const { seasonIndex } = req.params;
    try {
      const result = await fetchSeasonWithFood(seasonIndex);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
