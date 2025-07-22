import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { WalletCardComponent } from './components/wallet-card/wallet-card.component';
import { SuscripcionModalComponent } from './components/suscripcion-modal/suscripcion-modal.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HistorialModalComponent } from './components/historial-modal/historial-modal.component';

@NgModule({
  declarations: [WalletCardComponent, SuscripcionModalComponent, HistorialModalComponent],
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  exports: [WalletCardComponent, SuscripcionModalComponent, HistorialModalComponent],
  providers: [provideNgxMask(), CurrencyPipe],
})
export class SharedModule {}
