import { Component, OnInit } from '@angular/core';
import { FondosService } from 'src/app/core/services/fondos.service';
import { Fondo } from 'src/app/models/fondo.model';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  misFondos: Fondo[] = [];
  fondosDisponibles: Fondo[] = [];
  fondoSeleccionado?: Fondo;
  mostrarModal = false;
  mostrarModalHistorial = false;
  misFondosIds: number[] = [];
  saldo: number = 500000;

  constructor(
    private _fondosService: FondosService,
    public _utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.cargarFondos();
  }

  cargarFondos() {
    this.fondosDisponibles = [];
    this.misFondos = [];
    this._fondosService.getFondosPorEstado('D').subscribe((fondos) => {
      this.fondosDisponibles = fondos;
    });

    this._fondosService.getFondosPorEstado('S').subscribe((fondos) => {
      this.misFondos = fondos || [];
    });
  }

  abrirModal(event: { fondo: Fondo; action: string }) {
    const { fondo, action } = event;
    if (action === 'suscribir') {
      if (this.getSaldoDisponibleActual() < fondo.montoMinimo) {
        this._utilsService.showToast(
          `❌ No tienes saldo para invertir en ${fondo.nombre}`
        );
      } else {
        this.fondoSeleccionado = fondo;
        this.mostrarModal = true;
      }
    } else if (action === 'delete') {
      this._utilsService.presentAlert(
        `Retiro de fondo`,
        `Deseas retirarte del fondo ${fondo.nombre}?`,
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            console.log(fondo);

            this._fondosService
              .actualizarEstadoFondo(fondo.id, 'D', 0)
              .subscribe((updatedFondo) => {
                this.guardarTransaccion(fondo);
              });
          },
        }
      );
    }
  }

  guardarTransaccion(fondo: Fondo) {
    this._fondosService
      .insertarTransaccion(fondo.nombre, 'D', fondo.montoInvertido)
      .subscribe((updatedFondo) => {
        this._utilsService.showToast(
          `✅ Retiro del fondo ${fondo.nombre} fue satisfactorio.`
        );
        this.cargarFondos();
      });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  cerrarModalHistorial() {
    this.mostrarModalHistorial = false;
  }

  getTotalInvertido(): number {
    return this.misFondos.reduce(
      (total, fondo) => total + fondo.montoInvertido,
      0
    );
  }

  getSaldoDisponibleActual(): number {
    return this.saldo - this.getTotalInvertido();
  }

  async agregarSuscripcion() {
    this.cargarFondos();
    this.cerrarModal();
  }
}
