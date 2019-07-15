import {
  Router,
  Request,
  Response
} from 'express';
import { fetchFoodDataWithFilteredRecipes } from '../../fetch-data';

export const foodApi = (router = Router()) => {
  router.get('/:foodId', async (req: Request, res: Response) => {
    const { foodId } = req.params;
    const isVegetarian = req.query['is-vegetarian'];
    const isVegan = req.query['is-vegan'];
    try {
      const result = await fetchFoodDataWithFilteredRecipes(
        foodId, isVegetarian, isVegan
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  return router;
};
