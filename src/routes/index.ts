import { Router } from 'express';

import categoriasRouter from './categorias.routes';
import moviesRouter from './movies.routes';

const routes = Router();

routes.use('/categorias', categoriasRouter);
routes.use('/movies', moviesRouter);

export default routes;
