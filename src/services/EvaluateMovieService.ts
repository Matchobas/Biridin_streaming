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

    const movie = await this.moviesRepository.findByNameAndEvaluate({
      titulo,
      avaliacao,
    });

    return movie;
  }
}

export default EvaluateMovieService;
