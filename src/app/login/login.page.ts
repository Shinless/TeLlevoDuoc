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
import { Observable, Subscription } from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ConnectionService } from '../services/connections/connection.service';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { InsertUserData } from '../models/InsertUserData';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {

  //Users: Observable<UserData[]>;
  //prueba : Subscription;
  //usuarioPruebaInsertar: InsertUserData = {
   // name: 'Ezekiel',
   // last_name: 'Mcknight',
   // email: 'montes.nascetur.ridiculus@yahoo.ca',
   // password: 'Lucius I. Schneider'
  //}
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

  constructor(private route: Router,
    private modalController: ModalController,
    public http: HttpClient,
    private connectionService: ConnectionService
    ) {
      //this.prueba = this.connectionService.getUsers().subscribe(data => {
        //console.log(data)});
      //this.connectionService.insertUser(this.usuarioPruebaInsertar).subscribe(data => {
        //console.log(data)});
     } // Agrega 'private' aquí

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
  userLoginSupabase(userLoginInfo: UserLogin): boolean {
    this.connectionService.getUserByEmail(userLoginInfo.email, userLoginInfo.password).subscribe({ //Se llama al metodo getUserByEmail del servicio connectionService
      next: user => { //Se crea una variable para guardar los datos del usuario
        console.log('Usuario', user);
        if (user.length > 0) { //Se verifica si el usuario existe
          console.log('User Logged...', user[0].email, user[0].password); 
          const userInfoSend: NavigationExtras = { //Se crea una variable para guardar los datos del usuario
            state: { user }  //Se guarda los datos del usuario en la variable creada
          };
          this.route.navigate(['/user'], userInfoSend); //Se redirige a la pagina user
        } else {
          console.log('Usuario no encontrado...');
          this.userLoginModalRestart();
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    return true;
  }
}