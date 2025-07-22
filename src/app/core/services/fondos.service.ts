import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fondo, Transaccion } from 'src/app/models/fondo.model';

@Injectable({
  providedIn: 'root',
})
export class FondosService {
  private apiUrl =
    'https://687fe8cef1dcae717b609c41.mockapi.io/api/fondos';

  constructor(private http: HttpClient) {}

  // Obtener todos los fondos
  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.apiUrl}/transacciones`);
  }

  // Obtener fondos filtrados por estado: 'D' (disponible) o 'S' (suscrito)
  getFondosPorEstado(estado: 'D' | 'S'): Observable<Fondo[]> {
    return this.http.get<Fondo[]>(`${this.apiUrl}/fondos?estado=${estado}`);
  }

  // Cambiar estado del fondo (por ejemplo: de D a S)
  actualizarEstadoFondo(
    id: number,
    estado: 'D' | 'S',
    montoInvertido: number
  ): Observable<Fondo> {
    return this.http.put<Fondo>(`${this.apiUrl}/fondos/${id}`, {
      estado,
      montoInvertido,
    });
  }

  // Insetar transacción
  insertarTransaccion(
    nombre: string,
    estado: 'D' | 'S',
    monto: number
  ): Observable<Transaccion> {
    return this.http.post<Transaccion>(`${this.apiUrl}/transacciones`, {
      nombre,
      estado,
      monto,
    });
  }
}
