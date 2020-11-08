import { inject, injectable } from 'tsyringe';

import Categoria from '../entities/Categoria';

import RedisCacheProvider from '../providers/RedisCacheProvider';
import CategoriasRepository from '../repositories/CategoriasRepository';

interface requestDTO {
  descricao: string;
}

@injectable()
class CreateCategoriaService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: CategoriasRepository,

    @inject('RedisCacheProvider')
    private redisCacheProvider: RedisCacheProvider,
  ) {}

  public async execute({ descricao }: requestDTO): Promise<Categoria> {
    const cacheKey = 'all-categories';

    const categoria = await this.categoriasRepository.createCategoria({
      descricao,
    });

    await this.redisCacheProvider.invalidate(cacheKey);

    return categoria;
  }
}

export default CreateCategoriaService;
