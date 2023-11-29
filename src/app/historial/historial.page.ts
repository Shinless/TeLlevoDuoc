import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectionService } from '../services/connections/connection.service';
import { StorageService } from '../services/Storage/storage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  items: any[] = [];
  id_user!: number;

  constructor(
    private connectionService: ConnectionService,
    private storage: StorageService,
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { 
    storage.obtener('IdUser').then((data) => {
      this.id_user = parseInt(data?.valueOf()!);
      this.listarHistorialDeViajes(this.id_user);
      console.log(this.id_user);
    });
  }

  ngOnInit() {
  }

  dragItem(event: any, index: number) {}

  listarHistorialDeViajes(id_user: number) {
    this.connectionService.getHistorialViajes(id_user).subscribe(viajes => { 
        this.items = viajes;
        console.log(this.items);
    });
  }

  verRuta(item: any) {
    // Puedes pasar información adicional sobre el viaje a la página de Viaje
    // En este caso, enviamos el objeto `item` completo.
    this.navCtrl.navigateForward(`/ruta/${item.id_viaje}`);
  }



  iniciarNavegacion(item: any) {
    // Redirigir a la página de viaje con el ID del viaje
    this.router.navigate(['/ruta', item.id_viaje]);
  }

  async eliminarReserva(id_reserva: number) {
    this.connectionService.deleteReserva(id_reserva).subscribe(
      (data) => {
        this.mostrarToast('Reserva eliminada con éxito', 'success');
      },
      (error) => {
        
        console.error('Error al eliminar la reserva:', error);
        this.mostrarToast(error, 'danger');
      }
    );
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
      color: color,
    });
    toast.present();
  }

}
