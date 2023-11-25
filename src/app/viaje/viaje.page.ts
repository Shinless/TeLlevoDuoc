// viaje.page.ts
import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { interval, Subject } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnDestroy {
  @ViewChild('map', { static: true })
  mapElementRef!: ElementRef;
  googleMaps: any;
  map: any;
  userMarker: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  destinationCoords: any;
  lat: number = -33.0228;
  lng: number = -71.5519;
  origin: any = { lat: -33.022785, lng: -71.551908 };
  destination: any = { lat: -33.0195464, lng: -71.5576581 };

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private geolocation: Geolocation,
  ) {}

  ngOnInit() {
    this.loadMap();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
          url: 'assets/img/car-icon.png',
          scaledSize: new googleMaps.Size(60, 60),
        },
        animation: googleMaps.Animation.DROP,
      });

      // Actualizar la ubicación, centrar el mapa y obtener una ruta cada 2 segundos
      interval(2000)
        .pipe(
          takeWhile(() => true),
          takeUntil(this.destroy$)
        )
        .subscribe(async () => {
          await this.trackLocation();
          this.centerMap();
          this.getDirections();
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

  async getDirections() {
    try {
      const directions = await this.gmaps.getDirections(this.origin, this.destination);
      this.displayRoute(directions);
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
    }
  }

  displayRoute(directions: any) {
    const directionsRenderer = new this.googleMaps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    directionsRenderer.setDirections(directions);
  }
}
