import { Injectable } from '@angular/core';
import { UserData } from 'src/app/models/UserData';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: UserData | undefined;

  setUser(user: UserData | undefined) {
    this.userData = user;
  }

  getUser(): UserData | undefined {
    return this.userData;
  }
}
