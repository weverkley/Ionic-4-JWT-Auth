import { Component, OnInit } from '@angular/core';

import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'cart'
    },
    {
      title: 'Meus Pedidos',
      url: '/pedidos',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  ngOnInit() {}

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.logout();
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Sim',
          cssClass: 'danger',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(titulo: string, message: string) {
    const toast = await this.toastController.create({
      message: titulo + ' ' + message,
      duration: 3000,
      showCloseButton: true,
      // position: 'top',
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
