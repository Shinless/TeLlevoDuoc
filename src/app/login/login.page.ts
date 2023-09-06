import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular'; // Importa ModalController
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { UserLogin } from '../models/UserLogin';
import { TripData } from '../models/TripData';
import { UserData } from '../models/UserData';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'; // Importa el componente del modal

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule]
})
export class LoginPage implements OnInit {

  listUser: UserData[] = [
    new UserData(1, 'Jamalia', 'Clark', 'velit.dui.semper@icloud.edu', 'C', 'Nolans'),
    new UserData(2, 'Vielka', 'Haley', 'venenatis.vel@aol.net', 'P', 'Brody T. Mcclure'),
    new UserData(3, 'Ezekiel', 'Mcknight', 'montes.nascetur.ridiculus@yahoo.ca', 'C', 'Lucius I. Schneider'),
    new UserData(4, 'Hayden', 'Howell', 'lectus.cum.sociis@protonmail.ca', 'C', 'Jolie P. Atkinson'),
    new UserData(5, 'Esteban', 'Rojas', 'admin', 'P', 'admin'),
  ];

  userLoginModal: UserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router, private modalController: ModalController) { } // Agrega 'private' aquí

  ngOnInit() {
    this.userLoginModalRestart();
  }

  async openForgotPasswordModal() {
    console.log('Abriendo modal...');
    const modal = await this.modalController.create({
      component: ForgotPasswordComponent,
      cssClass: 'forgot-password-modal'
    });
    return await modal.present();
  }

  userLogin(userLoginInfo: UserLogin): boolean {
    for (let i = 0; i < this.listUser.length; i++) {
      if ((this.listUser[i].email == userLoginInfo.email) && (this.listUser[i].password == userLoginInfo.password)) {
        console.log('User Loged...', this.userLoginModal.email, this.userLoginModal.password);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if (this.listUser[i].type == 'C') {
          let sendInfo = this.route.navigate(['/user'], userInfoSend);
          return true;
        } else {
          let sendInfo = this.route.navigate(['/user'], userInfoSend);
          return true;
        }
      }
    }
    this.userLoginModalRestart();
    return false;
  }

  userLoginModalRestart(): void {
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }
}
