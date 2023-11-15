  import { Component } from '@angular/core';
  import { insertViajeData } from '../models/insertViajeData';
  import { ConnectionService } from '../services/connections/connection.service';
  import { ToastController } from '@ionic/angular';
  import { StorageService } from '../services/Storage/storage.service';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  import { environment } from 'src/environments/environment';




  @Component({
    selector: 'app-crear-viaje',
    templateUrl: './crear-viaje.page.html',
    styleUrls: ['./crear-viaje.page.scss'],
  })
  export class CrearViajeComponent {
    id_user!: number;
    viajeData: insertViajeData = new insertViajeData(0, 0, 0, '', '');
    patenteData: string = '';
    private readonly API_KEY = environment.googleMapsApiKey;

    constructor(
      private connectionService: ConnectionService,
      private toastController: ToastController,
      private storage: StorageService,
      private geolocation: Geolocation
  )

  {
    this.inicializarIdUsuario();
  }


    obtenerUbicacionUsuario() {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude y resp.coords.longitude contienen las coordenadas
        const lat = resp.coords.latitude;
        const lng = resp.coords.longitude;
    
        // Utiliza lat y lng como origen en tu solicitud de direcciones
        this.viajeData.origen = `${lat},${lng}`;
      }).catch((error) => {
        console.error('Error al obtener la ubicación', error);
      });
    }


    async obtenerDireccionDesdeCoordenadas() {
      const coordinates = await this.geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;
      const apiKey = this.API_KEY;  // Reemplaza con tu clave
  
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Respuesta de geocodificación inversa:', data);
      
        if (data.status === 'OK') {
          const direccion = data.results[0].formatted_address;
          this.viajeData.origen = direccion;
        } else {
          console.warn('Dirección no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener la dirección', error);
      }  
    }

    async inicializarIdUsuario() {
      const data = await this.storage.obtener('IdUser');
      this.id_user = parseInt(data?.valueOf()!) || 0;
      console.log(this.id_user);
    }

    async agregarViaje() {
      // Buscar la patente y verificar el user_id
      const vehiculos = await this.connectionService.getVehiculos().toPromise();
      const vehiculoEncontrado = vehiculos?.find((vehiculo) => vehiculo.Patente_id === this.patenteData && vehiculo.Id_Dueño === this.id_user);
    
      if (!vehiculoEncontrado) {
        // Muestra un mensaje de error con un toast
        this.presentToast('La patente no existe o no coincide con tu usuario.', 'danger');
        return; // Detiene la función
      }
    
      // Verifica que la cantidad de asientos sea un número entero entre 1 y 6
      this.viajeData.Asientos_max = parseInt(this.viajeData.Asientos_max.toString(), 10);
    
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
    
      // Verifica si el user tiene el mismo ID que el dueño de la patente
      if (this.id_user !== vehiculoEncontrado.Id_Dueño) {
        // Muestra un mensaje de error con un toast
        this.presentToast('No eres el dueño de la patente.', 'danger');
        return; // Detiene la función
      }
    
      this.viajeData.id_conductor = this.id_user;
    
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
