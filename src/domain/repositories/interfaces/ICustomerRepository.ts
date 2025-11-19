import { Customer } from '../../entities/Customer';

/**
 * Interface do repositório de Customer
 * Seguindo o princípio de Inversão de Dependência (SOLID)
 */
export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findByTableNumber(tableNumber: number): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
}

