import {
  Router,
  Request,
  Response
} from 'express';
import { fetchFoodDataById } from '../../fetch-data';

export const foodApi = (router = Router()) => {
  router.get('/:foodId', async (req: Request, res: Response) => {
    const { foodId } = req.params;
    try {
      const result = await fetchFoodDataById(foodId);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
