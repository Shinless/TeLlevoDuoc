import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { InsertUserData } from 'src/app/models/InsertUserData';
import { UserDataService } from '../data/user-data.service';
import { environment } from 'src/environments/environment';
import { insertViajeData } from 'src/app/models/insertViajeData';

@Injectable({
  providedIn: 'root',
})

export class ConnectionService {
  private readonly API_URL = environment.API_URL;
  private readonly API_KEY = environment.API_KEY;
  private readonly AUTH_TOKEN = environment.AUTH_TOKEN;


  constructor(private _http: HttpClient, private UserDataService: UserDataService) {}

  // Cabeceras de solicitud HTTP
  header = new HttpHeaders().set('apikey', this.API_KEY);

  // Obtener todos los usuarios
  getUsers(): Observable<UserData[]> {
    return this._http.get<UserData[]>(this.API_URL + 'Users?select=*', { headers: this.header, responseType: 'json' });
  }

  // Obtener usuario por email y contraseña
  getUserByEmail(email: string, password: string): Observable<UserData[]> {
    return this._http.get<UserData[]>(
      this.API_URL + `Users?email=eq.${email}` + '&select=*',
      { headers: this.header, responseType: 'json' }
    ).pipe(
      tap((users: UserData[]) => {
        if (users.length > 0) {
          // Almacena temporalmente los datos del primer usuario en UserDataService
          this.UserDataService.setUser(users[0]);
        }
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this._http
      .get<UserData[]>(
        this.API_URL + `Users?email=eq.${email}` + '&select=email',
        { headers: this.header, responseType: 'json' }
      )
      .pipe(
        map((users: UserData[]) => {
          return users.length > 0;
        })
      );
  }

  // Insertar un nuevo usuario
  insertUser(user: InsertUserData): Observable<InsertUserData> {
    return this._http.post<InsertUserData>(this.API_URL+'Users', user, { headers: this.header.set('Authorization', this.AUTH_TOKEN), responseType: 'json' });
  }

  // Obtener usuario por ID
  getUserById(userId: any): Observable<UserData> {
    return this._http.get<UserData>(this.API_URL + `Users?id=eq.${userId}` + '&select=*', { headers: this.header, responseType: 'json' });
  }
  registerUser(userData: InsertUserData): Observable<UserData> {
    // Realiza una solicitud POST al backend para registrar al usuario
    return this._http.post<UserData>(
      this.API_URL, // Esta URL debería ser la correcta para la inserción de usuarios
      userData,
      { headers: this.header, responseType: 'json' }
    ).pipe(
      tap((user: UserData) => {
        // Almacena temporalmente los datos del usuario registrado en UserDataService
        this.UserDataService.setUser(user);
      })
    );
  }
  getViajes(): Observable<any[]> {
    return this._http.get<any[]>(this.API_URL + 'Viaje?select=*', { headers: this.header, responseType: 'json' });
  }
  insertViaje(viaje : insertViajeData): Observable<any> {
    return this._http.post<insertViajeData>(this.API_URL+'Viaje', viaje, { headers: this.header, responseType: 'json' });
  }
}

