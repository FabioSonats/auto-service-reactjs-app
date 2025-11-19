/**
 * Entidade Table
 * Representa uma mesa do restaurante
 */
export class Table {
  constructor(
    public readonly number: number,
    public readonly qrCode: string,
    public readonly isOccupied: boolean
  ) {}

  /**
   * Gera o link do QR Code para a mesa
   */
  getMenuUrl(baseUrl: string): string {
    return `${baseUrl}/menu?mesa=${this.number}`;
  }
}

