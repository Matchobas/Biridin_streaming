import { inject, injectable } from 'tsyringe';

import MoviesRepository from '../repositories/MoviesRepository';
import CategoriasRepository from '../repositories/CategoriasRepository';
import MoviesToCategoriesRepository from '../repositories/MoviesToCategoriesRepository';

import Movie from '../entities/Movie';

@injectable()
class ListMoviesByCategoryService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: MoviesRepository,

    @inject('CategoriasRepository')
    private categoriasRepository: CategoriasRepository,

    @inject('MoviesToCategoriesRepository')
    private moviesToCategoriesRepository: MoviesToCategoriesRepository,
  ) {}

  public async execute(categoria: string): Promise<Movie[] | undefined> {
    const category = await this.categoriasRepository.findByName(categoria);

    if (!category) {
      throw new Error('This category does not exist');
    }

    const relations = await this.moviesToCategoriesRepository.findByCategoryId(
      category.id,
    );

    if (!relations) {
      throw new Error('No relations with this category');
    }

    const moviesIds = relations.map(relation => {
      return relation.id;
    });

    const movies = await this.moviesRepository.findByIds(moviesIds);

    return movies;
  }
}

export default ListMoviesByCategoryService;
