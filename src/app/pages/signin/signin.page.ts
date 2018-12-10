import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public form: FormGroup;
  public usuarios: any;

  constructor(
    private navCtl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    public alertController: AlertController
  ) {
    this.usuarios = [];
    if (this.authService.isLoggedIn()) {
      this.navCtl.navigateRoot('/home');
    }
    this.usuarioService.getUsuarios().subscribe((result: any) => {
      if (typeof result !== 'undefined') {
        if (!result.error) {
          this.usuarios = result.data;
        }
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  async doLogin() {
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.login(user).subscribe((result: any) => {
        if (!result.error) {
          this.form.reset();
          this.authService.setToken(result.data);
          setTimeout(() => {
            this.navCtl.navigateRoot('/home');
            // this.alertController.dismiss();
          }, 100);
        } else {
          this.presentAlert(result.error, result.message);
        }
      });
    }
  }

  async presentAlert(error: boolean, message: string) {
    const alert = await this.alertController.create({
      header: error === true ? 'Erro!' : 'Sucesso!',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
