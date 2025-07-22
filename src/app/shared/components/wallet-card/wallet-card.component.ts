import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fondo } from 'src/app/models/fondo.model';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
  standalone: false,
})
export class WalletCardComponent implements OnInit {
  @Input() fondo!: Fondo;
  @Input() disponible: boolean = false;
  @Output() suscribir = new EventEmitter<{ fondo: Fondo; action: string }>();

  constructor(public _utilsService: UtilsService) {}

  ngOnInit() {}

  onSuscribirme() {
    this.suscribir.emit({ fondo: this.fondo, action: 'suscribir' });
  }

  onDelete() {
    this.suscribir.emit({ fondo: this.fondo, action: 'delete' });
  }
}
