// gmaps.service.ts

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GmapsService {

  private loadedGoogleMaps: any;

  constructor() { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    if (this.loadedGoogleMaps) {
      return Promise.resolve(this.loadedGoogleMaps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 
            'https://maps.googleapis.com/maps/api/js?key=' + 
            environment.googleMapsApiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          this.loadedGoogleMaps = loadedGoogleModule.maps;
          resolve(this.loadedGoogleMaps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

  async getDirections(origin: any, destination: any): Promise<any> {
    const googleMaps = await this.loadGoogleMaps();
    const directionsService = new googleMaps.DirectionsService();

    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin,
          destination,
          travelMode: googleMaps.TravelMode.DRIVING,
        },
        (response: any, status: any) => {
          if (status === 'OK') {
            resolve(response);
          } else {
            reject(status);
          }
        }
      );
    });
  }

  async geocodeAddress(address: string): Promise<any> {
    const googleMaps = await this.loadGoogleMaps();
    const geocoder = new googleMaps.Geocoder();
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          console.log('Coordenadas de geocodificación:', location);
          resolve(location);
        } else {
          console.error('Error al geocodificar la dirección:', status);
          reject(status);
        }
      });
    });
  }
}
