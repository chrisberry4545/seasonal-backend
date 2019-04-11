import {
  Router,
  Request,
  Response
} from 'express';
import { fetchAllSeasonsWithFood } from '../../fetch-data';

export const seasonWithFoodApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const result = await fetchAllSeasonsWithFood();
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
