import { Router } from 'express';

import categoriasRouter from './categorias.routes';

const routes = Router();

routes.use('/categorias', categoriasRouter);

export default routes;
