import Router from 'express';
import { container } from 'tsyringe';

import CategoryRepository from '../repositories/CategoriasRepository';

import ListAllCategoriasService from '../services/ListAllCategoriasService';
import CreateCategoriaService from '../services/CreateCategoriaService';

const categoriasRouter = Router();

categoriasRouter.get('/', async (request, response) => {
  try {
    const listAllCategoriasService = container.resolve(
      ListAllCategoriasService,
    );

    const todasCategorias = await listAllCategoriasService.execute();

    return response.json(todasCategorias);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

categoriasRouter.post('/create', async (request, response) => {
  try {
    const { descricao } = request.body;

    const createCategoriaService = container.resolve(CreateCategoriaService);

    const categoria = await createCategoriaService.execute({ descricao });

    return response.json(categoria);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

categoriasRouter.put('/update', async (request, response) => {
  try {
    const categoriaRepository = new CategoryRepository();

    const { id, descricao } = request.body;

    const newCategoria = await categoriaRepository.changeDescription({
      id: Number(id),
      descricao,
    });

    return response.json(newCategoria);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

categoriasRouter.delete('/deletar', async (request, response) => {
  try {
    const categoriaRepository = new CategoryRepository();

    const { id } = request.body;

    await categoriaRepository.deleteById(Number(id));

    return response.json({ message: 'Categoria deletada com sucesso' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default categoriasRouter;
