import { container } from 'tsyringe';

import MoviesRepository from '../repositories/MoviesRepository';
import CategoriasRepository from '../repositories/CategoriasRepository';
import MoviesToCategoriesRepository from '../repositories/MoviesToCategoriesRepository';

container.registerSingleton<MoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<CategoriasRepository>(
  'CategoriasRepository',
  CategoriasRepository,
);

container.registerSingleton<MoviesToCategoriesRepository>(
  'MoviesToCategoriesRepository',
  MoviesToCategoriesRepository,
);
