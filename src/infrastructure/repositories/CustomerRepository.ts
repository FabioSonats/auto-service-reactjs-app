import { Customer } from '../../domain/entities/Customer';
import { ICustomerRepository } from '../../domain/repositories/interfaces/ICustomerRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

/**
 * Implementação do repositório de Customer
 * Usa banco de dados in-memory
 */
export class CustomerRepository implements ICustomerRepository {
  constructor(private db: InMemoryDatabase) {}

  async create(customer: Customer): Promise<Customer> {
    this.db.saveCustomer(customer);
    return customer;
  }

  async findByTableNumber(tableNumber: number): Promise<Customer | null> {
    const customer = this.db.findCustomerByTableNumber(tableNumber);
    return customer || null;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.db.findCustomerById(id);
    return customer || null;
  }
}

