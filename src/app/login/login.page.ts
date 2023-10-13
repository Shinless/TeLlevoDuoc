import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular'; // Importa ModalController
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { UserLogin } from '../models/UserLogin';
import { TripData } from '../models/TripData';
import { UserData } from '../models/UserData';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'; // Importa el componente del modal
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule]
})
export class LoginPage implements OnInit {

  listUser: UserData[] = [
    new UserData(1, 'Jamalia', 'Clark', 'velit.dui.semper@icloud.edu', 'Nolans'),
    new UserData(2, 'Vielka', 'Haley', 'venenatis.vel@aol.net',  'Brody T. Mcclure'),
    new UserData(3, 'Ezekiel', 'Mcknight', 'montes.nascetur.ridiculus@yahoo.ca', 'Lucius I. Schneider'),
    new UserData(4, 'Hayden', 'Howell', 'lectus.cum.sociis@protonmail.ca', 'Jolie P. Atkinson'),
    new UserData(5, 'Esteban', 'Rojas', 'admin', 'admin'),
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
    const user = this.listUser.find(u => u.email === userLoginInfo.email && u.password === userLoginInfo.password);
  
    if (user) {
      console.log('User Logged...', user.email, user.password);
      const userInfoSend: NavigationExtras = {
        state: { user }
      };
  
      this.route.navigate(['/user'], userInfoSend);
      return true;
    }
  
    this.userLoginModalRestart();
    return false;
  }  

  userLoginModalRestart(): void {
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

async openRegister() {
  console.log('Abriendo modal...');
  const modal = await this.modalController.create({
    component: RegisterComponent,
    cssClass: 'Register-modal'
  });
  return await modal.present();
}
}