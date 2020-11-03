import { Router } from 'express';

import categoriasRouter from './categorias.routes';
import moviesRouter from './movies.routes';
import movieCategoryRouter from './movieToCategoria.routes';

const routes = Router();

routes.use('/categorias', categoriasRouter);
routes.use('/movies', moviesRouter);
routes.use('/movieCategory', movieCategoryRouter);

export default routes;
