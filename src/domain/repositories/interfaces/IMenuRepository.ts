import { MenuItem, MenuCategory } from '../../entities/MenuItem';

/**
 * Interface do repositório de Menu
 * Seguindo o princípio de Inversão de Dependência (SOLID)
 */
export interface IMenuRepository {
  findAll(): Promise<MenuItem[]>;
  findById(id: string): Promise<MenuItem | null>;
  findByCategory(category: MenuCategory): Promise<MenuItem[]>;
  findAvailable(): Promise<MenuItem[]>;
}

