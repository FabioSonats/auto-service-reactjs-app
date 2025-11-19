import { MenuItem, MenuCategory } from '../domain/entities/MenuItem';
import { IMenuRepository } from '../domain/repositories/interfaces/IMenuRepository';

/**
 * Use Case: Obter Menu
 * Responsável por buscar o menu disponível
 * Seguindo o princípio de Responsabilidade Única (SOLID)
 */
export class GetMenuUseCase {
  constructor(private menuRepository: IMenuRepository) {}

  /**
   * Retorna todos os itens do menu disponíveis
   */
  async execute(): Promise<MenuItem[]> {
    return await this.menuRepository.findAvailable();
  }

  /**
   * Retorna itens do menu por categoria
   */
  async executeByCategory(category: MenuCategory): Promise<MenuItem[]> {
    const allItems = await this.menuRepository.findAvailable();
    return allItems.filter(item => item.category === category);
  }
}

