import { inject, injectable } from 'tsyringe';

import Categoria from '../entities/Categoria';
import CategoriasRepository from '../repositories/CategoriasRepository';

@injectable()
class ListAllCategoriasService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: CategoriasRepository,
  ) {}

  public async execute(): Promise<Categoria[]> {
    const categorias = await this.categoriasRepository.findAll();

    return categorias;
  }
}

export default ListAllCategoriasService;
