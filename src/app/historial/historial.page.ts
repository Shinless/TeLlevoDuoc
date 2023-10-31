import { Component, OnInit } from '@angular/core';
import { TripData } from '../models/TripData';
import { ConnectionService } from '../services/connections/connection.service';
import { StorageService } from '../services/Storage/storage.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  listaViajes : TripData[] = [
    new TripData("admin",5,1,"Quilpue",4,4,1000,1,2,[1,2,3,5],1),
    new TripData("'velit.dui.semper@icloud.edu",1,2,"Siete hermanas",4,4,1000,1,2,[1,2,3,4],2),
    new TripData("admin",5,3,"Viaje a la U",4,4,1000,1,2,[1,2,3,5],1),
    
  ];
  items: any[] = [];

  id_user!: number;

  constructor(
    private connectionService: ConnectionService,
    private storage: StorageService
  ) { 
    storage.obtener('IdUser').then((data) => {
      this.id_user = parseInt(data?.valueOf()!);
      this.listarHistorialDeViajes(this.id_user);
      console.log(this.id_user);});
  }

  ngOnInit() {
  }
  dragItem(event: any, index:number){}

  listarHistorialDeViajes(id_user: number) {
    this.connectionService.getHistorialViajes(id_user).subscribe(viajes => { 
        this.items = viajes;
        console.log(this.items);
    });
  }

}
