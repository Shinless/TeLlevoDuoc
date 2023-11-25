// gmaps.service.ts

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GmapsService {

  constructor() { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
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
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

  async getDirections(origin: any, destination: any): Promise<any> {
    const directionsService = new google.maps.DirectionsService();

    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
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
}
