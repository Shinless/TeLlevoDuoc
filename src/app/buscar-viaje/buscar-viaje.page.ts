import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ConnectionService } from '../services/connections/connection.service';
import { StorageService } from '../services/Storage/storage.service';
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {
  items: any[] = [];
  nombre: string | undefined;
  id_user!: number;
  aux : any;

  constructor(
    private connectionService: ConnectionService,
    private storage: StorageService,
    private toastController: ToastController // Inyecta ToastController
  ) { 
    this.listarViajes();
    //this.id_user = await lastValueFrom(this.storage.obtener('IdUser'))
    //this.storage.obtener('IdUser').then((data) => {
     // this.id_user = parseInt(data?.valueOf()!);
     // this.aux = data;
    //});
  }

  async ngOnInit() {
      await this.storage.obtener('IdUser').then((data) => {
      this.id_user = parseInt(data?.valueOf()!);
      //this.aux = data;
    });
    this.storage.obtener('NameUser').then((data) => {
      this.aux = data || '';
      
    });
  }

  listarViajes() {
    this.connectionService.getViajes().subscribe(viajes => { 
      this.items = viajes;
    });
  }

  async comprarAsiento(id_viaje: number, id_pasajero: number) {
    this.connectionService.getAsientosViaje(id_viaje).subscribe(asientos => {
      if (this.comprobarAsientos(asientos[0].Asientos_max)) {
        this.connectionService.crearReserva(id_viaje, id_pasajero).subscribe(
          (data) => {
            this.mostrarToast('Reserva creada con éxito', 'success');
          },
          (error) => {
            
            console.error('Error al crear la reserva:', error);
            this.mostrarToast(error, 'danger');
          }
        );
      } else {
        this.mostrarToast('No hay asientos disponibles', 'danger');
      }
    });
  }

  comprobarAsientos(seats: number): boolean {
    return seats > 0;
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
      color: color,
    });
    toast.present();
  }
  
  async obtenerNombreConductor(id_conductor: number): Promise<string> {
    try {
      const nombreConductor = await this.connectionService.getNombreConductor(id_conductor).toPromise();
      return nombreConductor || 'Nombre no disponible'; // provide a default value for nombreConductor
    } catch (error) {
      console.error('Error al obtener el nombre del conductor:', error);
      return 'Nombre no disponible';
    }
  }
}
