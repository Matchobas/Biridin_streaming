import { getRepository, Repository } from 'typeorm';

import MoviesToCategorias from '../entities/MoviesToCategorias';

interface MoviesToCategoriasDTO {
  categoriaId: number;
  movieId: number;
}

interface QueryDTO {
  max: number;
}

class MoviesToCategories {
  private ormRepository: Repository<MoviesToCategorias>;

  constructor() {
    this.ormRepository = getRepository(MoviesToCategorias);
  }

  public async findByCategoryId(
    id: number,
  ): Promise<MoviesToCategorias[] | undefined> {
    const relations = await this.ormRepository.find({
      where: { categoria_id: id },
    });

    return relations;
  }

  public async findByMovieId(
    id: number,
  ): Promise<MoviesToCategorias[] | undefined> {
    const relations = await this.ormRepository.find({
      where: { movie_id: id },
    });

    return relations;
  }

  public async findByTwoIds({
    categoriaId,
    movieId,
  }: MoviesToCategoriasDTO): Promise<MoviesToCategorias | undefined> {
    const relation = await this.ormRepository.findOne({
      where: { categoria_id: categoriaId, movie_id: movieId },
    });

    return relation;
  }

  public async create({
    categoriaId,
    movieId,
  }: MoviesToCategoriasDTO): Promise<MoviesToCategorias> {
    const primeiro = await this.ormRepository.findOne({
      where: { id: 1 },
    });

    let id = 1;

    if (primeiro) {
      const query = this.ormRepository.createQueryBuilder('movie_categoria');
      query.select('MAX(movie_categoria.id)', 'max');

      const maxId: QueryDTO = await query.getRawOne();

      id = maxId.max + 1;
    }

    const relation = this.ormRepository.create({
      id,
      categoria_id: categoriaId,
      movie_id: movieId,
    });

    await this.ormRepository.save(relation);

    return relation;
  }
}

export default MoviesToCategories;
