  import { Component, OnInit } from '@angular/core';
  import { ModalController } from '@ionic/angular'; // Importa ModalController
  import { Router, NavigationExtras } from '@angular/router';
  import { UserLogin } from '../models/UserLogin';
  import { ConnectionService } from '../services/connections/connection.service';
  import { InsertUserData } from '../models/InsertUserData';
  import { UserDataService } from '../services/data/user-data.service';
  import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'; // Importa el componente del modal
  import { RegisterComponent } from '../register/register.component';
  import { StorageService } from '../services/Storage/storage.service';
  


  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage implements OnInit {
    
    userLoginModal: UserLogin = {
      email: '',
      password: '',
    };

    constructor(
      private route: Router,
      private modalController: ModalController,
      private connectionService: ConnectionService,
      private UserDataService: UserDataService,
      private Storage: StorageService,
    ) {
      
    }

    ngOnInit() {
      this.userLoginModalRestart();
    }
    
    
    

    async openForgotPasswordModal() {
      console.log('Abriendo modal...');
      const modal = await this.modalController.create({
        component: ForgotPasswordComponent,
        cssClass: 'forgot-password-modal',
      });
      return await modal.present();
    }

    userLoginModalRestart(): void {
      this.userLoginModal.email = '';
      this.userLoginModal.password = '';
    }

    async openRegister() {
      console.log('Abriendo modal...');
      const modal = await this.modalController.create({
        component: RegisterComponent,
        cssClass: 'Register-modal',
      });
      return await modal.present();
    }

    userLoginSupabase(userLoginInfo: UserLogin): void {
      this.connectionService.getUserByEmail(userLoginInfo.email, userLoginInfo.password).subscribe({
        next: (users) => {
          if (users.length > 0) {
            const user = users[0];
            //console.log(user.id)
            this.Storage.guardar('IdUser', user.id.toString());
            this.Storage.guardar('NameUser', user.name);
            console.log(this.Storage.obtener('IdUser'));
            console.log(this.Storage.obtener('NameUser'));
            /*
            this.UserDataService.setUser(user); // Almacena los datos del usuario
            const navigationExtras: NavigationExtras = {
              state: { userInfoSend: user },
            };*/
            this.route.navigate(['/user']); // Redirige a la página de usuario con datos del usuario
            
          } else {
            console.log('Usuario no encontrado...');
            this.userLoginModalRestart();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }  
