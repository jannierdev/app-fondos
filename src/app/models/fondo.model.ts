export interface Fondo {
  id: number;
  nombre: string;
  montoMinimo: number;
  montoInvertido: number;
  categoria: 'FPV' | 'FIC';
  estado: 'D' | 'S';
}

export interface Transaccion {
  nombre: string;
  monto: number;
  estado: 'D' | 'S';
}
