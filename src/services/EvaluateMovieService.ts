import MoviesRepository from '../repositories/MoviesRepository';
import Movie from '../entities/Movie';

interface RequestDTO {
  titulo: string;
  avaliacao: number;
}

class EvaluateMovieService {
  private moviesRepository: MoviesRepository;

  constructor(moviesRepository: MoviesRepository) {
    this.moviesRepository = moviesRepository;
  }

  public async execute({
    titulo,
    avaliacao,
  }: RequestDTO): Promise<Movie | undefined> {
    if (avaliacao > 10 || avaliacao < 0) {
      throw new Error('An evaluation must be between 0 and 10');
    }

    const movie = await this.moviesRepository.findByName(titulo);

    if (movie) {
      if (movie.avaliacao) {
        movie.avaliacao = (Number(movie.avaliacao) + avaliacao) / 2.0;
      } else {
        movie.avaliacao = avaliacao;
      }
      const evaluatedMovie = await this.moviesRepository.saveMovie(movie);

      return evaluatedMovie;
    }

    return movie;
  }
}

export default EvaluateMovieService;
