import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  errorMessage: string = ''; //Variable para guardar el mensaje de error
  Datos_usuario: UserData | undefined; //Se crea una variable para guardar los datos del usuario
  constructor() { }

  ngOnInit() {
  }

}
