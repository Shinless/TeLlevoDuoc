import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConnectionService } from '../services/connections/connection.service';
import { InsertUserData } from '../models/InsertUserData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userData: InsertUserData = {
    name: '',
    last_name: '',
    email: '',
    password: '',
  };
  confirmPassword = '';

  errorMessage: string = '';

  constructor(private modalCtrl: ModalController, private connectionService: ConnectionService) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async registerUser() {
    const emailFormat = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailFormat.test(this.userData.email)) {
      // Verifica si el correo electrónico tiene un formato válido.
      this.errorMessage = 'El correo electrónico no tiene un formato válido.';
    } else {
      // Verifica si el usuario ya existe en la base de datos
      this.connectionService.checkEmailExists(this.userData.email).subscribe(
        (exists) => {
          if (exists) {
            // El correo electrónico ya está registrado, muestra un mensaje de error.
            this.errorMessage = 'El correo electrónico ya está registrado.';
          } else if (this.userData.password.length < 6 || !/\d/.test(this.userData.password)) {
            // Verifica que la contraseña cumpla con los requisitos.
            this.errorMessage = 'La contraseña debe tener al menos 6 caracteres y contener al menos un número.';
          } else if (this.userData.password !== this.confirmPassword) {
            // Las contraseñas no coinciden, muestra un mensaje de error.
            this.errorMessage = 'Las contraseñas no coinciden.';
          } else {
            // Realiza el registro del usuario en Supabase
            this.connectionService.registerUser(this.userData).subscribe(
              (user) => {
                // Registro exitoso, aquí puedes manejar el redireccionamiento a la página de usuario.
                console.log('Usuario registrado:', user);

                // Cierra el modal de registro
                this.modalCtrl.dismiss(null, 'confirm');
              },
              (error) => {
                // Maneja cualquier error durante el registro.
                console.error('Error durante el registro:', error);
              }
            );
          }
        },
        (error) => {
          // Maneja cualquier error durante la verificación del correo electrónico existente.
          console.error('Error durante la verificación del correo electrónico:', error);
        }
      );
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
