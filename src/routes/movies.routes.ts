import { Router } from 'express';

import MoviesRepository from '../repositories/MoviesRepository';
import CreateMovieService from '../services/CreateMovieService';
import EvaluateMovieService from '../services/EvaluateMovieService';

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

moviesRouter.post('/create', async (request, response) => {
  const moviesRepository = new MoviesRepository();
  const createMovieService = new CreateMovieService(moviesRepository);

  try {
    const { titulo, sinopse, duracao, avaliacao } = request.body;

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
  const moviesRepository = new MoviesRepository();
  const evaluateMovieService = new EvaluateMovieService(moviesRepository);

  try {
    const { titulo, avaliacao } = request.body;

    const movie = await evaluateMovieService.execute({
      titulo,
      avaliacao: Number(avaliacao),
    });

    return response.json(movie);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default moviesRouter;
