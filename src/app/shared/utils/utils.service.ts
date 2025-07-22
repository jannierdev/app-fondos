import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private currencyPipe: CurrencyPipe
  ) {}

  formatMoney(value: number) {
    return this.currencyPipe.transform(value, '$ ', 'symbol', '1.0-0');
  }

  async showToast(message: string, action?: any) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
    if (action) {
      toast.onDidDismiss().then(() => {
        action();
      });
    }
  }

  async presentAlert(
    header: string,
    message: string,
    button: any,
    inputs?: any,
    subHeader?: string
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      inputs: inputs || [],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // console.log('Alert canceled');
          },
        },
        button,
      ],
    });

    await alert.present();
  }
}
