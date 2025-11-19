import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

export function createOrderRoutes(orderController: OrderController): Router {
  const router = Router();

  router.post('/', (req, res) => orderController.create(req, res));
  router.patch('/:id/status', (req, res) => orderController.updateStatus(req, res));

  return router;
}

