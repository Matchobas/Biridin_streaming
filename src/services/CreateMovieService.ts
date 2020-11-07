import { inject, injectable } from 'tsyringe';

import MoviesRepository from '../repositories/MoviesRepository';
import Movie from '../entities/Movie';

interface RequestDTO {
  titulo: string;
  sinopse: string;
  duracao: number;
  avaliacao?: number;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: MoviesRepository,
  ) {}

  public async execute({
    titulo,
    sinopse,
    duracao,
    avaliacao,
  }: RequestDTO): Promise<Movie> {
    if (duracao < 10 || duracao > 600) {
      throw new Error(
        'This movie duration is invalid, please enter another between 10 and 600',
      );
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
