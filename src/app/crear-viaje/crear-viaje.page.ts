import { Component } from '@angular/core';
import { insertViajeData } from '../models/insertViajeData';
import { ConnectionService } from '../services/connections/connection.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajeComponent {
  viajeData: insertViajeData = new insertViajeData(0, 0, 0, '', '');

  constructor(private connectionService: ConnectionService, 
    private toastController: ToastController
    ) {}


  agregarViaje() {
    // Verifica que la cantidad de asientos sea un número entero entre 1 y 6
    // Convierte el valor de viajeData.Asientos_max a un número entero
    this.viajeData.Asientos_max = parseInt(this.viajeData.Asientos_max.toString(), 10);

    // Verifica que la cantidad de asientos sea un número entero entre 1 y 6
    if (
      !Number.isInteger(this.viajeData.Asientos_max) ||
      this.viajeData.Asientos_max < 1 ||
      this.viajeData.Asientos_max > 6
    ) {
      // Muestra un mensaje de error con un toast
      this.presentToast('La cantidad de asientos debe ser un número entero entre 1 y 6.', 'danger');
      return; // Detiene la función
    }
  
    // Verifica que el precio sea un número entero no negativo
    if (!Number.isInteger(this.viajeData.precio) || this.viajeData.precio < 0) {
      // Muestra un mensaje de error con un toast
      this.presentToast('El precio debe ser un número entero no negativo.', 'danger');
      return; // Detiene la función
    }
  
    // Agrega más validaciones para los campos origen y destino si es necesario
    if (!this.viajeData.origen || !this.viajeData.destino) {
      // Muestra un mensaje de error con un toast
      this.presentToast('El origen y destino son obligatorios.', 'danger');
      return; // Detiene la función
    }
  
    // Si todas las validaciones pasan, procede a agregar el viaje
    this.connectionService.insertViaje(this.viajeData).subscribe(
      (respuesta) => {
        console.log('Viaje insertado correctamente:', respuesta);
        // Muestra un mensaje de éxito con un toast y redirige al usuario si es necesario
        this.presentToast('Viaje insertado con éxito', 'success');
      },
      (error) => {
        console.error('Error al insertar el viaje:', error);
        // Muestra un mensaje de error con un toast
        this.presentToast('Error al insertar el viaje', 'danger');
      }
    );
  }
  
  // Función para mostrar un toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del toast en milisegundos
      color: color, // Color del toast (puede ser 'success', 'danger', etc.)
    });
    toast.present();
  }
}  
