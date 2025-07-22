import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Fondo } from 'src/app/models/fondo.model';
import { CurrencyPipe } from '@angular/common';
import { FondosService } from 'src/app/core/services/fondos.service';

@Component({
  selector: 'app-suscripcion-modal',
  templateUrl: './suscripcion-modal.component.html',
  styleUrls: ['./suscripcion-modal.component.scss'],
  standalone: false,
})
export class SuscripcionModalComponent implements OnInit {
  @Input() fondo!: Fondo;
  @Input() show = false;
  @Input() saldo!: number;
  @Output() close = new EventEmitter<void>();
  @Output() suscripcion = new EventEmitter<{ fondo: Fondo }>();

  montoIngresado: number = 0;

  constructor(
    private _utilsService: UtilsService,
    private _fondosService: FondosService
  ) {}

  ngOnInit() {}

  validarMonto() {
    if (this.montoIngresado > this.saldo) {
      this._utilsService.showToast(
        `❌ No tienes saldo para invertir en ${this.fondo.nombre}`
      );
    } else {
      if (this.montoIngresado >= this.fondo.montoMinimo) {
        this._fondosService
          .actualizarEstadoFondo(this.fondo.id, 'S', this.montoIngresado)
          .subscribe((updatedFondo) => {
            this.guardarTransaccion();
          });
      } else {
        this._utilsService.showToast(
          `❌ El monto debe ser al menos ${this._utilsService.formatMoney(
            this.fondo.montoMinimo
          )}`
        );
      }
    }
  }

  guardarTransaccion() {
    this._fondosService
      .insertarTransaccion(this.fondo.nombre, 'S', this.montoIngresado)
      .subscribe((updatedFondo) => {
        this._utilsService.showToast(
          `✅ Suscripción válida. Invertiste ${this._utilsService.formatMoney(
            this.montoIngresado
          )}`
        );
        this.suscripcion.emit({ fondo: this.fondo });
        this.montoIngresado = 0;
      });
  }

  cerrar() {
    this.close.emit();
    this.montoIngresado = 0;
  }
}
