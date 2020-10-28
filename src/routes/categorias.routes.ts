import Router from 'express';

import CategoryRepository from '../repositories/CategoriasRepository';

import ListAllCategoriasService from '../services/ListAllCategoriasService';
import CreateCategoriaService from '../services/CreateCategoriaService';
import ChangeDescriptionService from '../services/ChangeDescriptionService';

const categoriasRouter = Router();

categoriasRouter.get('/', async (request, response) => {
  try {
    const categoriaRepository = new CategoryRepository();
    const listAllCategoriasService = new ListAllCategoriasService(
      categoriaRepository,
    );

    const todasCategorias = await listAllCategoriasService.execute();

    return response.json(todasCategorias);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

categoriasRouter.post('/create', async (request, response) => {
  try {
    const categoriaRepository = new CategoryRepository();
    const createCategoriaService = new CreateCategoriaService(
      categoriaRepository,
    );

    const { descricao } = request.body;

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
