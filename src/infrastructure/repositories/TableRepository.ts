import { Table } from '../../domain/entities/Table';
import { ITableRepository } from '../../domain/repositories/interfaces/ITableRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

/**
 * Implementação do repositório de Table
 * Usa banco de dados in-memory
 */
export class TableRepository implements ITableRepository {
  constructor(private db: InMemoryDatabase) {}

  async findByNumber(number: number): Promise<Table | null> {
    const table = this.db.findTableByNumber(number);
    return table || null;
  }

  async findAll(): Promise<Table[]> {
    return this.db.findAllTables();
  }

  async updateOccupation(number: number, isOccupied: boolean): Promise<Table> {
    const table = await this.findByNumber(number);
    if (!table) {
      throw new Error(`Mesa não encontrada: ${number}`);
    }

    const updatedTable = new Table(
      table.number,
      table.qrCode,
      isOccupied
    );

    this.db.saveTable(updatedTable);
    return updatedTable;
  }
}

