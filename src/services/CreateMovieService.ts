import MoviesRepository from '../repositories/MoviesRepository';
import Movie from '../entities/Movie';

interface RequestDTO {
  titulo: string;
  sinopse: string;
  duracao: number;
  avaliacao?: number;
}

class CreateMovieService {
  private moviesRepository: MoviesRepository;

  constructor(moviesRepository: MoviesRepository) {
    this.moviesRepository = moviesRepository;
  }

  public async execute({
    titulo,
    sinopse,
    duracao,
    avaliacao,
  }: RequestDTO): Promise<Movie> {
    if (duracao < 10) {
      throw new Error('This movie duration is invalid, please enter another');
    }

    if (avaliacao) {
      if (avaliacao > 10 || avaliacao < 0) {
        throw new Error('The rating must be between 0 and 10');
      }
    }

    const movie = await this.moviesRepository.create({
      titulo,
      sinopse,
      duracao,
      avaliacao,
    });

    return movie;
  }
}

export default CreateMovieService;
