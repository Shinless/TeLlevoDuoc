import { Injectable } from '@angular/core';
import { UserData } from 'src/app/models/UserData';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Variable para almacenar los datos del usuario
  private userData: UserData | undefined;

  // Establecer los datos del usuario
  setUser(user: UserData | undefined) {
    this.userData = user;
  }

  // Obtener los datos del usuario almacenados
  getUser(): UserData | undefined {
    return this.userData;
  }
}
