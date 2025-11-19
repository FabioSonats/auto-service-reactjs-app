import { Request, Response } from 'express';
import { AskAllergyUseCase } from '../../usecases/AskAllergyUseCase';

/**
 * Controller para operações relacionadas ao cliente
 */
export class CustomerController {
  constructor(private askAllergyUseCase: AskAllergyUseCase) {}

  /**
   * POST /api/customer/allergies
   * Body: { tableNumber: number, allergies: string[] }
   * Registra as alergias do cliente
   */
  async registerAllergies(req: Request, res: Response): Promise<void> {
    try {
      const { tableNumber, allergies } = req.body;

      if (!tableNumber || typeof tableNumber !== 'number') {
        res.status(400).json({
          success: false,
          error: 'Número da mesa é obrigatório'
        });
        return;
      }

      if (!Array.isArray(allergies)) {
        res.status(400).json({
          success: false,
          error: 'Alergias devem ser um array'
        });
        return;
      }

      const customer = await this.askAllergyUseCase.execute(
        tableNumber,
        allergies
      );

      res.json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao registrar alergias'
      });
    }
  }
}

