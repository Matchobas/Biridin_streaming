import Categoria from '../entities/Categoria';
import CategoriasRepository from '../repositories/CategoriasRepository';

class ListAllCategoriasService {
  private categoriasRepository: CategoriasRepository;

  constructor(categoriasRepository: CategoriasRepository) {
    this.categoriasRepository = categoriasRepository;
  }

  public async execute(): Promise<Categoria[]> {
    const categorias = await this.categoriasRepository.findAll();

    return categorias;
  }
}

export default ListAllCategoriasService;
