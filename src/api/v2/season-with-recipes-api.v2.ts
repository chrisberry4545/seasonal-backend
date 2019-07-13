import {
    Router,
    Request,
    Response
  } from 'express';
import {
  fetchAllSeasonsWithRecipes,
  fetchFilteredSeasonsWithRecipes
} from '../../fetch-data';

export const seasonWithRecipesApi = (router = Router()) => {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const result = await fetchAllSeasonsWithRecipes();
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get('/:seasonIndex', async (req: Request, res: Response) => {
    const { seasonIndex } = req.params;
    const isVegetarian = req.query['is-vegetarian'];
    const isVegan = req.query['is-vegan'];
    try {
      const result = await fetchFilteredSeasonsWithRecipes(
        seasonIndex,
        isVegetarian,
        isVegan
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
