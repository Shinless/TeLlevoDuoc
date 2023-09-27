import { Component, OnInit } from '@angular/core';
import { TripData } from '../models/TripData';

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
  items = [{id:1, name:'Quilpue', date:'12/12/2019', time:'12:00', driver:'admin', passengers:5, price:1000, rating:4, comments:4, origin:1, destination:2, stops:[1,2,3,5], status:1},
            {id:2, name:'Siete Hermanas', date:'13/12/2019', time:'12:00', driver:'Esteban', passengers:5, price:2000, rating:4, comments:4, origin:1, destination:2, stops:[1,2,3,5], status:1},
            {id:3, name:'Viaje a la U', date:'14/12/2019', time:'12:00', driver:'admin', passengers:5, price:1500, rating:4, comments:4, origin:1, destination:2, stops:[1,2,3,5], status:1},
    
  ];

  constructor() { }

  ngOnInit() {
  }
  dragItem(event: any, index:number){}

  verconductor(){
    
  }

}
