import { WebSocketServer, WebSocket } from 'ws';
import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/repositories/interfaces/IOrderRepository';

/**
 * Serviço WebSocket para notificações de pedidos em tempo real
 */
export class OrderWebSocket {
  private wss: WebSocketServer;
  private kitchenClients: Set<WebSocket> = new Set();
  private barClients: Set<WebSocket> = new Set();

  constructor(server: any, private orderRepository: IOrderRepository) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          
          if (data.type === 'subscribe') {
            if (data.room === 'kitchen') {
              this.kitchenClients.add(ws);
              ws.send(JSON.stringify({ type: 'subscribed', room: 'kitchen' }));
            } else if (data.room === 'bar') {
              this.barClients.add(ws);
              ws.send(JSON.stringify({ type: 'subscribed', room: 'bar' }));
            }
          }
        } catch (error) {
          console.error('Erro ao processar mensagem WebSocket:', error);
        }
      });

      ws.on('close', () => {
        this.kitchenClients.delete(ws);
        this.barClients.delete(ws);
      });
    });
  }

  /**
   * Notifica a cozinha sobre um novo pedido
   */
  notifyKitchen(order: Order): void {
    const message = JSON.stringify({
      type: 'new_order',
      data: order
    });

    this.kitchenClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  /**
   * Notifica o bar sobre um novo pedido
   */
  notifyBar(order: Order): void {
    const message = JSON.stringify({
      type: 'new_order',
      data: order
    });

    this.barClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

