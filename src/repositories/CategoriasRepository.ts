import { Repository, getRepository } from 'typeorm';
import Categoria from '../entities/Categoria';

interface CategoriaDTO {
  id?: number;
  descricao: string;
}

interface QueryDTO {
  max: number;
}

class CategoriaRepository {
  private categoria: Repository<Categoria>;

  constructor() {
    this.categoria = getRepository(Categoria);
  }

  public async findAll(): Promise<Categoria[]> {
    const categorias = await this.categoria.find();

    return categorias;
  }

  public async createCategoria({
    descricao,
  }: CategoriaDTO): Promise<Categoria> {
    const primeiro = await this.categoria.findOne({
      where: { id: 1 },
    });

    let id = 1;

    if (primeiro) {
      const query = this.categoria.createQueryBuilder('categoria');
      query.select('MAX(categoria.id)', 'max');

      const maxId: QueryDTO = await query.getRawOne();

      id = maxId.max + 1;
    }

    const categoria = this.categoria.create({ id, descricao });

    await this.categoria.save(categoria);

    return categoria;
  }

  public async changeDescription({
    id,
    descricao,
  }: CategoriaDTO): Promise<Categoria | undefined> {
    const categoria = await this.categoria.findOne({
      where: { id },
    });

    if (categoria) {
      categoria.descricao = descricao;

      await this.categoria.save(categoria);
    }

    return categoria;
  }

  public async deleteById(id: number): Promise<void> {
    const categoria = await this.categoria.findOne(id);

    if (categoria) {
      await this.categoria.remove(categoria);
    }
  }
}

export default CategoriaRepository;
