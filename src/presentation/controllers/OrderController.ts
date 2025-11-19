import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../../usecases/CreateOrderUseCase';
import { IOrderRepository } from '../../domain/repositories/interfaces/IOrderRepository';
import { OrderStatus } from '../../domain/entities/Order';

/**
 * Controller para operações relacionadas a pedidos
 */
export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private orderRepository: IOrderRepository
  ) {}

  /**
   * POST /api/orders
   * Body: { tableNumber: number, itemIds: string[] }
   * Cria um novo pedido
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { tableNumber, itemIds } = req.body;

      if (!tableNumber || typeof tableNumber !== 'number') {
        res.status(400).json({
          success: false,
          error: 'Número da mesa é obrigatório'
        });
        return;
      }

      if (!Array.isArray(itemIds) || itemIds.length === 0) {
        res.status(400).json({
          success: false,
          error: 'É necessário selecionar pelo menos um item'
        });
        return;
      }

      const result = await this.createOrderUseCase.execute(
        tableNumber,
        itemIds
      );

      res.json({
        success: true,
        data: {
          kitchenOrder: result.kitchenOrder,
          barOrder: result.barOrder,
          message: 'Pedido criado com sucesso'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar pedido'
      });
    }
  }

  /**
   * PATCH /api/orders/:id/status
   * Body: { status: OrderStatus }
   * Atualiza o status de um pedido
   */
  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !Object.values(OrderStatus).includes(status)) {
        res.status(400).json({
          success: false,
          error: 'Status inválido'
        });
        return;
      }

      const order = await this.orderRepository.updateStatus(id, status as OrderStatus);

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar status do pedido'
      });
    }
  }
}

