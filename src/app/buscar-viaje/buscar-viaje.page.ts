import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from '../services/connections/connection.service';
import { Capacitor } from '@capacitor/core';
import { StorageService } from '../services/Storage/storage.service';


@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {
  items: any[] = [];
  nombre: string | undefined;
  id_user!: number;

  constructor(
    private connectionService: ConnectionService,
    private storage: StorageService
  ) { 
    this.listarViajes();
    console.log(this.conseguirNombre(1));
    storage.obtener('IdUser').then((data) => {
      this.id_user = parseInt(data?.valueOf()!);
      console.log(this.id_user);});
    
    
  }

  ngOnInit() {
    
  }

  //listarViajes(items: any[]) : any[] {
    // Add your code here
    //this.connectionService.getViajes().subscribe(viajes=> { 
      //  items = viajes;
      //  console.log(items); });
   // return items;
  //}
  listarViajes() {
    this.connectionService.getViajes().subscribe(viajes => { 
        this.items = viajes;
        console.log(this.items);
    });
  }
  conseguirNombre(id_conductor: number) {
    return this.connectionService.getNombreConductor(id_conductor);
  }
  
  async comprarAsiento(id_viaje: number, id_pasajero: number) {
    this.connectionService.crearReserva(id_viaje, id_pasajero).subscribe(
      (data) => {
        console.log(data);
      } 
    );
    console.log('Reserva creada');
  }


}
