import {
    Router,
    Request,
    Response
  } from 'express';
import {
  fetchAllSeasonsWithRecipes,
  fetchSeasonWithRecipes
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
    try {
      const result = await fetchSeasonWithRecipes(seasonIndex);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  return router;
};
