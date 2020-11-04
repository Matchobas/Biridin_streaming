import { Router } from 'express';

import MoviesToCategoriesRepository from '../repositories/MoviesToCategoriesRepository';
import MoviesRepository from '../repositories/MoviesRepository';
import CategoriasRepository from '../repositories/CategoriasRepository';

import SetCategoryToMovieService from '../services/SetCategoryToMovieService';

const movieCategoryRouter = Router();

movieCategoryRouter.post('/addcategory', async (request, response) => {
  const moviesToCategoriesRepository = new MoviesToCategoriesRepository();
  const moviesRepository = new MoviesRepository();
  const categoriasRepository = new CategoriasRepository();

  const setCategoryToMovieService = new SetCategoryToMovieService(
    moviesToCategoriesRepository,
    moviesRepository,
    categoriasRepository,
  );

  try {
    const { titulo, category } = request.body;

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
