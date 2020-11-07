import { inject, injectable } from 'tsyringe';

import Categoria from '../entities/Categoria';
import CategoriasRepository from '../repositories/CategoriasRepository';

interface requestDTO {
  descricao: string;
}

@injectable()
class CreateCategoriaService {
  constructor(
    @inject('CategoriasRepository')
    private categoriasRepository: CategoriasRepository,
  ) {}

  public async execute({ descricao }: requestDTO): Promise<Categoria> {
    const categoria = await this.categoriasRepository.createCategoria({
      descricao,
    });

    return categoria;
  }
}

export default CreateCategoriaService;
