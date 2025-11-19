import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { createMenuRoutes } from './routes/menu.routes';
import { createCustomerRoutes } from './routes/customer.routes';
import { createOrderRoutes } from './routes/order.routes';
import { MenuController } from './controllers/MenuController';
import { CustomerController } from './controllers/CustomerController';
import { OrderController } from './controllers/OrderController';
import { GetMenuUseCase } from '../usecases/GetMenuUseCase';
import { AskAllergyUseCase } from '../usecases/AskAllergyUseCase';
import { CreateOrderUseCase } from '../usecases/CreateOrderUseCase';
import { IMenuRepository } from '../domain/repositories/interfaces/IMenuRepository';
import { ICustomerRepository } from '../domain/repositories/interfaces/ICustomerRepository';
import { IOrderRepository } from '../domain/repositories/interfaces/IOrderRepository';

/**
 * Configuração da aplicação Express
 */
export function createApp(
  menuRepository: IMenuRepository,
  customerRepository: ICustomerRepository,
  orderRepository: IOrderRepository
): Express {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  
  // Servir painel estático (se existir)
  // Em produção, o painel deve ser servido pelo frontend
  // Esta rota é apenas para desenvolvimento
  try {
    app.use('/panel', express.static(path.join(process.cwd(), 'frontend/public/panel')));
  } catch (error) {
    // Ignorar erro se o diretório não existir
  }

  // Inicializar use cases
  const getMenuUseCase = new GetMenuUseCase(menuRepository);
  const askAllergyUseCase = new AskAllergyUseCase(customerRepository);
  const createOrderUseCase = new CreateOrderUseCase(
    orderRepository,
    customerRepository,
    menuRepository
  );

  // Inicializar controllers
  const menuController = new MenuController(getMenuUseCase);
  const customerController = new CustomerController(askAllergyUseCase);
  const orderController = new OrderController(createOrderUseCase, orderRepository);

  // Rotas
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Auto Service API is running' });
  });

  app.use('/api/menu', createMenuRoutes(menuController));
  app.use('/api/customer', createCustomerRoutes(customerController));
  app.use('/api/orders', createOrderRoutes(orderController));

  // Rota para o menu via QR Code
  app.get('/menu', (req, res) => {
    const mesa = req.query.mesa;
    if (!mesa) {
      return res.status(400).json({
        success: false,
        error: 'Número da mesa é obrigatório'
      });
    }
    // Esta rota será servida pelo frontend
    res.json({
      success: true,
      tableNumber: parseInt(mesa as string, 10),
      message: 'Acesse o menu digital'
    });
  });

  return app;
}

