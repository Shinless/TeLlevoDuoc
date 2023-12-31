import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { car } from 'src/app/models/car';
import { InsertUserData } from 'src/app/models/InsertUserData';
import { UserDataService } from '../data/user-data.service';
import { environment } from 'src/environments/environment.prod';
import { insertViajeData } from 'src/app/models/insertViajeData';
import { reserva } from 'src/app/models/reserva';

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

  getVehiculos(): Observable<car[]> {
    return this._http.get<car[]>(this.API_URL + 'Vehiculo?select=*', { headers: this.header, responseType: 'json' });
  }


  // Verificar si una patente existe
  checkPatenteExists(patente: string): Observable<boolean> {
    return this._http
      .get<car[]>(
        this.API_URL + `Vehiculo?Patente_id=eq.${patente}` + '&select=Patente_id',
        { headers: this.header, responseType: 'json' }
      )
      .pipe(
        map((result) => {
          return result.length > 0;
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

  // Obtener usuario por email y contraseña
  getUserByEmail(email: string, password: string): Observable<UserData[]> {
    return this._http.get<UserData[]>(
      this.API_URL + `Users?email=eq.${email}` +`&password=eq.${password}` + '&select=*',
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



  // Insertar un nuevo usuario
  insertUser(user: InsertUserData): Observable<InsertUserData> {
    return this._http.post<InsertUserData>(this.API_URL+'Users', user, { headers: this.header.set('Authorization', this.AUTH_TOKEN), responseType: 'json' });
  }

  // Obtener usuario por ID
  getUserById(userId: any): Observable<UserData> {
    return this._http.get<UserData>(this.API_URL + `Users?id=eq.${userId}` + '&select=*', { headers: this.header, responseType: 'json' });
  }
  registerUser(userData: InsertUserData): Observable<UserData> {
    // Realiza una solicitud P  OST al backend para registrar al usuario
    return this._http.post<UserData>(
      this.API_URL+'Users', // Esta URL debería ser la correcta para la inserción de usuarios
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
  getViajeIdFromReserva(idPasajero: number){
    //Para sacar el id de viaje de reserva
  }
  getViajeById(id_viaje: number){ 
    return this._http.get<any[]>(this.API_URL + `Viaje?id_viaje=eq.${id_viaje}` + '&select=*', { headers: this.header, responseType: 'json' });
  }
  getViajeByConductor(id_conductor: number){
    return this._http.get<any[]>(this.API_URL + `Viaje?id_conductor=eq.${id_conductor}` + '&select=*', { headers: this.header, responseType: 'json' });
  } //Obtener viajes por conductor para mostrarlos en el historial

  getAsientosViaje(idViaje: number): Observable<any> {
    return this._http.get<any>(this.API_URL + `Viaje?id_viaje=eq.${idViaje}&select=Asientos_max`, { headers: this.header, responseType: 'json' }); 
  }
  //aun le falta a esta funcion
  restarAsientoViaje(idViaje: number): Observable<any> {
    this.getAsientosViaje(idViaje).subscribe(asientos => {
      console.log(asientos[0].Asientos_max);
      let asientos_mod = asientos[0].Asientos_max - 1;
      console.log(asientos_mod);
      this.modificarAsientos(idViaje, asientos_mod).subscribe(
        (data) => {
          console.log(data);
        }
      );
    });
    
    return of(true);
  }
  sumarAsientoViaje(idViaje: number): Observable<any> {
    this.getAsientosViaje(idViaje).subscribe(asientos => {
      console.log(asientos[0].Asientos_max);
      let asientos_mod = asientos[0].Asientos_max + 1;
      //asientos = asientos_mod - 1;
      console.log(asientos_mod);
      this.modificarAsientos(idViaje, asientos_mod).subscribe(
        (data) => {
          console.log(data);
        }
      );
    });
    
    return of(true);
  }

  
  modificarAsientos(idViaje: number, asientos_nuevos: number): Observable<any> {
    return this._http.patch<any>(this.API_URL + `Viaje?id_viaje=eq.${idViaje}`, { Asientos_max: asientos_nuevos }, { headers: this.header, responseType: 'json' });
  } //Modificar asientos de un viaje para cuando se haga una reserva funciona como trigger falso
  getReservas(): Observable<any[]> {
    return this._http.get<any[]>(this.API_URL + 'Reserva?select=*', { headers: this.header, responseType: 'json' });
  }// revisar
  crearReserva(id_viaje: number, id_pasajero: number){
    console.log('Creando reserva...');
    console.log(id_viaje);
    console.log(id_pasajero);
    const reserva_nueva = new reserva (id_pasajero, id_viaje, 'confirmado');
    console.log(reserva_nueva);
    this.restarAsientoViaje(id_viaje);
    return this._http.post<reserva>(this.API_URL+'Reserva', reserva_nueva, { headers: this.header, responseType: 'json' });
    
    
  }
  getViajesFromReservaByPasajero(id_pasajero: number){
    return this._http.get<any>(this.API_URL + `Reserva?id_pasajero=eq.${id_pasajero}&select=id_viaje`, { headers: this.header, responseType: 'json' });
  }
  getNombreConductor(id_conductor: number): Observable<string> {
    return this._http.get<any>(this.API_URL + `Users?id=eq.${id_conductor}&select=name,last_name`, { headers: this.header, responseType: 'json' })
      .pipe(
        map(response => response[0].name + ' ' + response[0].last_name)
      );
  }
  getNombreusuario(id_conductor: number): Observable<string> {
    return this._http.get<any>(this.API_URL + `Users?id=eq.${id_conductor}&select=name`, { headers: this.header, responseType: 'json' });
  }
  

  getHistorialViajes(id_pasajero: number): Observable<any[]> {
    return this._http.get<any[]>(this.API_URL + `Viaje?select=*,Reserva(*)&Reserva.id_pasajero=eq.${id_pasajero}&Reserva=not.is.null`, { headers: this.header, responseType: 'json' });
  }
  deleteReserva(id_reserva: number){
    return this._http.delete<any>(this.API_URL + `Reserva?id_reserva=eq.${id_reserva}`, { headers: this.header, responseType: 'json' });
  }
  
  

}

