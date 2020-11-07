import { inject, injectable } from 'tsyringe';

import MoviesToCategoriesRepository from '../repositories/MoviesToCategoriesRepository';
import MoviesRepository from '../repositories/MoviesRepository';
import CategoriasRepository from '../repositories/CategoriasRepository';

import MoviesToCategorias from '../entities/MoviesToCategorias';

interface RequestDTO {
  titulo: string;
  categoria: string;
}

@injectable()
class SetCategoryToMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: MoviesRepository,

    @inject('CategoriasRepository')
    private categoriasRepository: CategoriasRepository,

    @inject('MoviesToCategoriesRepository')
    private moviesToCategoriesRepository: MoviesToCategoriesRepository,
  ) {}

  public async execute({
    titulo,
    categoria,
  }: RequestDTO): Promise<MoviesToCategorias | undefined> {
    const movie = await this.moviesRepository.findByName(titulo);

    const cat = await this.categoriasRepository.findByName(categoria);

    if (movie && cat) {
      const exists = await this.moviesToCategoriesRepository.findByTwoIds({
        categoriaId: cat.id,
        movieId: movie.id,
      });

      if (exists) {
        throw new Error('This movie is already related to this category');
      }

      const relation = await this.moviesToCategoriesRepository.create({
        categoriaId: cat.id,
        movieId: movie.id,
      });

      return relation;
    }

    return undefined;
  }
}

export default SetCategoryToMovieService;
