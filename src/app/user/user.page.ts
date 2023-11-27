import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { StorageService } from '../services/Storage/storage.service';
import { UserData } from '../models/UserData';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  @ViewChild('map', { static: true })
  mapElementRef!: ElementRef;
  googleMaps: any;
  map: any;
  Datos_usuario: UserData | undefined;
  id_user: any;
  user_name: string = '';
  userMarker: any; // Variable para almacenar el marcador

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private storage: StorageService,
    private geolocation: Geolocation
  ) {
    this.storage.obtener('IdUser').then((data) => {
      this.id_user = parseInt(data?.valueOf()!);
      console.log(this.id_user);
    });
    this.storage.obtener('NameUser').then((data) => {
      this.user_name = data || '';
      console.log(this.user_name);
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      const coordinates = await this.geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;

      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(lat, lng);

      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 15, // Adjust the zoom level as needed
      });

      this.renderer.addClass(mapEl, 'visible');

      this.userMarker = new googleMaps.Marker({
        position: location,
        map: this.map,
        title: 'Ubicación actual',
        icon: {
          url: 'assets/icon/pin.png',
          scaledSize: new googleMaps.Size(40, 60),
        },
        animation: googleMaps.Animation.DROP,
      });

      // Actualizar la ubicación y centrar el mapa cada 2 segundos
      interval(2000)
        .pipe(
          takeWhile(() => true)
        )
        .subscribe(async () => {
          await this.trackLocation();
          this.centerMap();
        });
    } catch (e) {
      console.log('Error al cargar el mapa:', e);
    }
  }

  async trackLocation() {
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
    };

    const position = await this.geolocation.getCurrentPosition(watchOptions);
    const { latitude, longitude } = position.coords;
    this.updateMap(latitude, longitude);
  }

  updateMap(lat: number, lng: number) {
    if (this.map && this.userMarker) {
      const newLocation = new this.googleMaps.LatLng(lat, lng);

      this.map.panTo(newLocation);
      this.userMarker.setPosition(newLocation);
    }
  }

  centerMap() {
    if (this.map && this.userMarker) {
      const markerPosition = this.userMarker.getPosition();
      if (markerPosition) {
        this.map.panTo(markerPosition);
      }
    }
  }
}
