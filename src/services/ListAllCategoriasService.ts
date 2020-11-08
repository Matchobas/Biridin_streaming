import { inject, injectable } from 'tsyringe';

import Categoria from '../entities/Categoria';

import RedisCacheProvider from '../providers/RedisCacheProvider';
import CategoriasRepository from '../repositories/CategoriasRepository';

@injectable()
class ListAllCategoriasService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: CategoriasRepository,

    @inject('RedisCacheProvider')
    private redisCacheProvider: RedisCacheProvider,
  ) {}

  public async execute(): Promise<Categoria[]> {
    const cacheKey = 'all-categories';

    let categorias = await this.redisCacheProvider.recover<Categoria[]>(
      cacheKey,
    );

    if (!categorias) {
      categorias = await this.categoriasRepository.findAll();

      await this.redisCacheProvider.save(cacheKey, categorias);
    }

    return categorias;
  }
}

export default ListAllCategoriasService;
