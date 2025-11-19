import { Customer } from '../../domain/entities/Customer';
import { MenuItem } from '../../domain/entities/MenuItem';
import { Order } from '../../domain/entities/Order';
import { Table } from '../../domain/entities/Table';

/**
 * Banco de dados in-memory
 * Simula um banco de dados para desenvolvimento e testes
 */
export class InMemoryDatabase {
  private customers: Map<string, Customer> = new Map();
  private menuItems: Map<string, MenuItem> = new Map();
  private orders: Map<string, Order> = new Map();
  private tables: Map<number, Table> = new Map();

  // Customers
  saveCustomer(customer: Customer): void {
    this.customers.set(customer.id, customer);
  }

  findCustomerById(id: string): Customer | undefined {
    return this.customers.get(id);
  }

  findCustomerByTableNumber(tableNumber: number): Customer | undefined {
    return Array.from(this.customers.values()).find(
      c => c.tableNumber === tableNumber
    );
  }

  // Menu Items
  saveMenuItem(item: MenuItem): void {
    this.menuItems.set(item.id, item);
  }

  findMenuItemById(id: string): MenuItem | undefined {
    return this.menuItems.get(id);
  }

  findAllMenuItems(): MenuItem[] {
    return Array.from(this.menuItems.values());
  }

  // Orders
  saveOrder(order: Order): void {
    this.orders.set(order.id, order);
  }

  findOrderById(id: string): Order | undefined {
    return this.orders.get(id);
  }

  findAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  // Tables
  saveTable(table: Table): void {
    this.tables.set(table.number, table);
  }

  findTableByNumber(number: number): Table | undefined {
    return this.tables.get(number);
  }

  findAllTables(): Table[] {
    return Array.from(this.tables.values());
  }

  /**
   * Limpa todos os dados (útil para testes)
   */
  clear(): void {
    this.customers.clear();
    this.menuItems.clear();
    this.orders.clear();
    this.tables.clear();
  }
}

