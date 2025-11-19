import { Router } from 'express';
import { MenuController } from '../controllers/MenuController';

export function createMenuRoutes(menuController: MenuController): Router {
  const router = Router();

  router.get('/', (req, res) => menuController.getAll(req, res));
  router.get('/category', (req, res) => menuController.getByCategory(req, res));

  return router;
}

