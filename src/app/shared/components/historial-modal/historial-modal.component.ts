import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FondosService } from 'src/app/core/services/fondos.service';
import { Transaccion } from 'src/app/models/fondo.model';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-historial-modal',
  templateUrl: './historial-modal.component.html',
  styleUrls: ['./historial-modal.component.scss'],
  standalone: false,
})
export class HistorialModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  public transacciones: Transaccion[] = []
  constructor(
    private _fondosService: FondosService,
    public _utilsService: UtilsService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChange) {
    if (this.show) {
      this._fondosService.getTransacciones().subscribe((transacciones) => {
        console.log(transacciones);
        this.transacciones = transacciones;
      });
    }
  }

  cerrarModal() {
    this.close.emit();
  }
}
