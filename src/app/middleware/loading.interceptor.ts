import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

import { LoadingController, NavController, AlertController } from '@ionic/angular';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private count: number;
  private isLoading: boolean;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtl: NavController
  ) {
    this.count = 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;

    if (this.count === 1) {
      this.presentLoading();
    }

    return next.handle(req).pipe(timeout(10000), tap((e: HttpEvent<any>) => {
      if (e.type === HttpEventType.UploadProgress) {
        // this.dialog.setLoadingMode('determinate');
        // this.dialog.setLoadingValue(Math.round(100 * e.loaded / e.total));
      } else if (e instanceof HttpResponse) {
        this.count--;
        if (this.count === 0) {
          this.closeLoading();
        }
      }
    }),
      catchError(e => {
        this.closeLoading();
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401) {
            if (e.statusText === 'Unauthorized') {
              setTimeout(() => {
                localStorage.removeItem('token');
                this.navCtl.navigateRoot('/signin');
              }, 1000);
            }
            this.presentAlert(e.error.message);
          } else {
            this.presentAlert(e.error.message);
          }
        }
        if (e.name == 'TimeoutError') {
          this.presentAlert(e.message);
        }
        return observableThrowError(e);
      }));
  }

  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create();
    return await loading.present().then(() => {
      if (!this.isLoading) {
        loading.dismiss();
      }
    });;
  }

  async closeLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
