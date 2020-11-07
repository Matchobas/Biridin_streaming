import { Router } from 'express';
import { container } from 'tsyringe';

import MoviesRepository from '../repositories/MoviesRepository';

import CreateMovieService from '../services/CreateMovieService';
import EvaluateMovieService from '../services/EvaluateMovieService';
import ListMoviesByCategoryService from '../services/ListMoviesByCategoryService';

const moviesRouter = Router();

moviesRouter.get('/', async (request, response) => {
  const moviesRepository = new MoviesRepository();

  try {
    const movies = await moviesRepository.findAll();

    return response.json(movies);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

moviesRouter.get('/find', async (request, response) => {
  try {
    const { category } = request.query;

    const listMoviesByCategoryService = container.resolve(
      ListMoviesByCategoryService,
    );

    const movies = await listMoviesByCategoryService.execute(String(category));

    return response.json({ Categoria: category, movies });
  } catch (err) {
    return response.json({ Error: err.message });
  }
});

moviesRouter.post('/create', async (request, response) => {
  try {
    const { titulo, sinopse, duracao, avaliacao } = request.body;

    const createMovieService = container.resolve(CreateMovieService);

    const movie = await createMovieService.execute({
      titulo,
      sinopse,
      duracao,
      avaliacao,
    });

    return response.json(movie);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

moviesRouter.put('/evaluate', async (request, response) => {
  try {
    const { titulo, avaliacao } = request.body;

    const evaluateMovieService = container.resolve(EvaluateMovieService);

    const movie = await evaluateMovieService.execute({
      titulo,
      avaliacao: Number(avaliacao),
    });

    return response.json(movie);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

moviesRouter.delete('/delete', async (request, response) => {
  const moviesRepository = new MoviesRepository();
  try {
    const { titulo } = request.body;

    await moviesRepository.deleteMovie(titulo);

    return response.json('Movie removed');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default moviesRouter;
