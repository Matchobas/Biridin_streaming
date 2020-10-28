import Categoria from '../entities/Categoria';
import CategoriaRepository from '../repositories/CategoriasRepository';

interface requestDTO {
  descricao: string;
}

class CreateCategoriaService {
  private categoriaRepository: CategoriaRepository;

  constructor(categoriaRepository: CategoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  public async execute({ descricao }: requestDTO): Promise<Categoria> {
    const categoria = await this.categoriaRepository.createCategoria({
      descricao,
    });

    return categoria;
  }
}

export default CreateCategoriaService;
