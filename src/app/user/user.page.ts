import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  Datos_usuario: UserData | undefined;
  
  constructor() { }

  ngOnInit() {
  }

}
