import { Request, Response } from 'express';
import { GetMenuUseCase } from '../../usecases/GetMenuUseCase';
import { MenuCategory } from '../../domain/entities/MenuItem';

/**
 * Controller para operações relacionadas ao menu
 */
export class MenuController {
  constructor(private getMenuUseCase: GetMenuUseCase) {}

  /**
   * GET /api/menu
   * Retorna todos os itens do menu disponíveis
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.getMenuUseCase.execute();
      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar menu'
      });
    }
  }

  /**
   * GET /api/menu?category=APPETIZER
   * Retorna itens do menu por categoria
   */
  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = req.query.category as string;
      
      if (!category) {
        return this.getAll(req, res);
      }

      const menuCategory = category as MenuCategory;
      const items = await this.getMenuUseCase.executeByCategory(menuCategory);
      
      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar menu'
      });
    }
  }
}

