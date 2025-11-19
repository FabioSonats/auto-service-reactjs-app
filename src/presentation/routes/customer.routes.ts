import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

export function createCustomerRoutes(customerController: CustomerController): Router {
  const router = Router();

  router.post('/allergies', (req, res) => 
    customerController.registerAllergies(req, res)
  );

  return router;
}

