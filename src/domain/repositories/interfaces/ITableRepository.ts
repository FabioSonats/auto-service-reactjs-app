import { Table } from '../../entities/Table';

/**
 * Interface do repositório de Table
 * Seguindo o princípio de Inversão de Dependência (SOLID)
 */
export interface ITableRepository {
  findByNumber(number: number): Promise<Table | null>;
  findAll(): Promise<Table[]>;
  updateOccupation(number: number, isOccupied: boolean): Promise<Table>;
}

