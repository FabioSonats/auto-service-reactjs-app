import { MenuItem, MenuCategory } from '../../domain/entities/MenuItem';
import { IMenuRepository } from '../../domain/repositories/interfaces/IMenuRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

/**
 * Implementação do repositório de Menu
 * Usa banco de dados in-memory
 */
export class MenuRepository implements IMenuRepository {
  constructor(private db: InMemoryDatabase) {}

  async findAll(): Promise<MenuItem[]> {
    return this.db.findAllMenuItems();
  }

  async findById(id: string): Promise<MenuItem | null> {
    const item = this.db.findMenuItemById(id);
    return item || null;
  }

  async findByCategory(category: MenuCategory): Promise<MenuItem[]> {
    const allItems = await this.findAll();
    return allItems.filter(item => item.category === category);
  }

  async findAvailable(): Promise<MenuItem[]> {
    const allItems = await this.findAll();
    return allItems.filter(item => item.isAvailable);
  }
}

