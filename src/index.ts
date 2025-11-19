import http from 'http';
import { createApp } from './presentation/app';
import { InMemoryDatabase } from './infrastructure/database/InMemoryDatabase';
import { seedDatabase } from './infrastructure/database/seed';
import { CustomerRepository } from './infrastructure/repositories/CustomerRepository';
import { MenuRepository } from './infrastructure/repositories/MenuRepository';
import { OrderRepository } from './infrastructure/repositories/OrderRepository';
import { OrderRepositoryWithWebSocket } from './infrastructure/repositories/OrderRepositoryWithWebSocket';
import { OrderWebSocket } from './presentation/websocket/OrderWebSocket';

const PORT = process.env.PORT || 3000;

/**
 * Inicialização da aplicação
 */
async function main() {
  // Criar banco de dados in-memory
  const db = new InMemoryDatabase();
  
  // Popular banco com dados iniciais
  seedDatabase(db);

  // Criar repositórios base
  const customerRepository = new CustomerRepository(db);
  const menuRepository = new MenuRepository(db);
  const baseOrderRepository = new OrderRepository(db);

  // Criar aplicação Express (sem WebSocket ainda)
  const app = createApp(menuRepository, customerRepository, baseOrderRepository);

  // Criar servidor HTTP
  const server = http.createServer(app);

  // Configurar WebSocket para notificações em tempo real
  const orderWebSocket = new OrderWebSocket(server, baseOrderRepository);

  // Criar wrapper do OrderRepository com WebSocket
  const orderRepository = new OrderRepositoryWithWebSocket(
    baseOrderRepository,
    orderWebSocket
  );

  // Recriar app com o wrapper (para que use o repositório com WebSocket)
  // Na prática, vamos interceptar as criações manualmente
  // Por simplicidade, vamos modificar o CreateOrderUseCase para notificar
  // Mas a forma mais limpa é recriar o app
  const appWithWebSocket = createApp(menuRepository, customerRepository, orderRepository);
  
  // Substituir o handler do servidor
  server.removeAllListeners('request');
  server.on('request', appWithWebSocket);

  // Iniciar servidor
  server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 API disponível em http://localhost:${PORT}`);
    console.log(`🔌 WebSocket disponível em ws://localhost:${PORT}`);
    console.log(`📋 Menu QR Code: http://localhost:${PORT}/menu?mesa=1`);
  });
}

main().catch(console.error);
