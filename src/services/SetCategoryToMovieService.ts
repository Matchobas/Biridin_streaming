import MoviesToCategoriesRepository from '../repositories/MoviesToCategoriesRepository';
import MoviesRepository from '../repositories/MoviesRepository';
import CategoriasRepository from '../repositories/CategoriasRepository';

import MoviesToCategorias from '../entities/MoviesToCategorias';

interface RequestDTO {
  titulo: string;
  categoria: string;
}

class SetCategoryToMovieService {
  private moviesToCategoriesRepository: MoviesToCategoriesRepository;

  private moviesRepository: MoviesRepository;

  private categoriasRepository: CategoriasRepository;

  constructor(
    moviesToCategoriesRepository: MoviesToCategoriesRepository,
    moviesRepository: MoviesRepository,
    categoriasRepository: CategoriasRepository,
  ) {
    this.moviesToCategoriesRepository = moviesToCategoriesRepository;
    this.moviesRepository = moviesRepository;
    this.categoriasRepository = categoriasRepository;
  }

  public async execute({
    titulo,
    categoria,
  }: RequestDTO): Promise<MoviesToCategorias | undefined> {
    const movie = await this.moviesRepository.findByName(titulo);

    const cat = await this.categoriasRepository.findByName(categoria);

    if (movie && cat) {
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
