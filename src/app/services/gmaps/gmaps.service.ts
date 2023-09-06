import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  constructor() { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      // google is already loaded Pregunrtar si ya esta cargado
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script'); //Se crea un script para cargar el Maps
      script.src = 
            'https://maps.googleapis.com/maps/api/js?key=' + 
            environment.googleMapsApiKey; //Se crea Url para cargar el Maps
      script.async = true; //Se carga de forma asincrona 
      script.defer = true; //Se carga de forma diferida
      document.body.appendChild(script); //Se agrega el script al body
      script.onload = () => { //Se crea un evento onload para cuando se cargue el script
        const loadedGoogleModule = win.google; //Se crea una variable para guardar el modulo de google
        if (loadedGoogleModule && loadedGoogleModule.maps) { //Se pregunta si el modulo de google y el maps estan cargados
          resolve(loadedGoogleModule.maps); //Se resuelve la promesa
        } else {
          reject('Google maps SDK not available.'); //Se rechaza la promesa en caso de que no este cargado
        }
      };
    });
  }
}
