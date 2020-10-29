import { Repository, getRepository } from 'typeorm';
import Movie from '../entities/Movie';

interface MovieDTO {
  titulo: string;
  sinopse: string;
  duracao: number;
  avaliacao?: number;
}

interface QueryDTO {
  max: number;
}

interface EvaluateDTO {
  titulo: string;
  avaliacao: number;
}

class MoviesRepository {
  private moviesOrm: Repository<Movie>;

  constructor() {
    this.moviesOrm = getRepository(Movie);
  }

  public async findAll(): Promise<Movie[]> {
    const movies = await this.moviesOrm.find();

    return movies;
  }

  public async findByNameAndEvaluate({
    titulo,
    avaliacao,
  }: EvaluateDTO): Promise<Movie | undefined> {
    const movie = await this.moviesOrm.findOne({
      where: { titulo },
    });

    if (movie) {
      movie.avaliacao = avaliacao;

      await this.moviesOrm.save(movie);
    }

    return movie;
  }

  public async create({
    titulo,
    sinopse,
    duracao,
    avaliacao,
  }: MovieDTO): Promise<Movie> {
    const primeiro = await this.moviesOrm.findOne({
      where: { id: 1 },
    });

    let id = 1;

    if (primeiro) {
      const query = this.moviesOrm.createQueryBuilder('movie');
      query.select('MAX(categoria.id)', 'max');

      const maxId: QueryDTO = await query.getRawOne();

      id = maxId.max + 1;
    }

    const movie = this.moviesOrm.create({
      id,
      titulo,
      sinopse,
      duracao,
      avaliacao,
    });

    await this.moviesOrm.save(movie);

    return movie;
  }
}

export default MoviesRepository;
