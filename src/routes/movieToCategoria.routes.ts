import { Router } from 'express';
import { container } from 'tsyringe';

import SetCategoryToMovieService from '../services/SetCategoryToMovieService';

const movieCategoryRouter = Router();

movieCategoryRouter.post('/addcategory', async (request, response) => {
  try {
    const { titulo, category } = request.body;

    const setCategoryToMovieService = container.resolve(
      SetCategoryToMovieService,
    );

    const relation = await setCategoryToMovieService.execute({
      titulo,
      categoria: category,
    });

    return response.json(relation);
  } catch (err) {
    return response.json({ Error: err.message });
  }
});

export default movieCategoryRouter;
