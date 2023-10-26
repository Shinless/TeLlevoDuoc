import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  constructor(
      private modalCtrl: ModalController,
      private connectionService: ConnectionService,
      private toastController: ToastController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async registerUser() {
    // Verifica si el correo electrónico tiene un formato válido.
    const emailFormat = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailFormat.test(this.userData.email)) {
      this.presentToast('El correo electrónico no tiene un formato válido', 'danger');
      return;
    }

    // Verifica si el usuario ya existe en la base de datos
    this.connectionService.checkEmailExists(this.userData.email).subscribe(
      (exists) => {
        if (exists) {
          // El correo electrónico ya está registrado, muestra un mensaje de error.
          this.presentToast('El correo electrónico ya está registrado', 'danger');
        } else if (this.userData.password.length < 6 || !/\d/.test(this.userData.password)) {
          // Verifica que la contraseña cumpla con los requisitos.
          this.presentToast('La contraseña debe tener al menos 6 caracteres y contener al menos un número', 'danger');
        } else if (this.userData.password !== this.confirmPassword) {
          // Las contraseñas no coinciden, muestra un mensaje de error.
          this.presentToast('Las contraseñas no coinciden', 'danger');
        } else {
          // Realiza el registro del usuario en Supabase
          this.connectionService.registerUser(this.userData).subscribe(
            (user) => {
              // Registro exitoso, muestra un toast y cierra el modal.
              this.presentToast('Usuario registrado con éxito', 'success');
              this.modalCtrl.dismiss(null, 'confirm');
            },
            (error) => {
              // Maneja cualquier error durante el registro.
              console.error('Error durante el registro:', error);
              // Muestra un toast de error
              this.presentToast('Hubo un error durante el registro', 'danger');
            }
          );
        }
      },
      (error) => {
        // Maneja cualquier error durante la verificación del correo electrónico existente.
        console.error('Error durante la verificación del correo electrónico:', error);
        this.presentToast('Hubo un error durante la verificación del correo electrónico', 'danger');
      }
    );
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
