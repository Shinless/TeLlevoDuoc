import { Component, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { interval, Subject } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../services/connections/connection.service';

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
  destination: any;
  centerMapAutomatically: boolean = true;


  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tripIdString = params.get('id_viaje');
      if (tripIdString !== null) {
        const tripId = +tripIdString;
        this.loadMap(tripId);
      } else {
        console.error('El parámetro "id_viaje" es nulo.');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  async loadMap(tripId: number) {
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
        zoom: 15,
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

      interval(2000)
      .pipe(
        takeWhile(() => true),
        takeUntil(this.destroy$)
      )
      .subscribe(async () => {
        await this.trackLocation();
        // this.centerMap(); // Comenta o elimina esta línea
        this.getDirections();
      });
    

      this.connectionService.getViajeById(tripId).subscribe((tripDetails: any) => {
        console.log('Detalles del viaje:', tripDetails);
        this.handleTripDetails(tripDetails);
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
      this.userMarker.setPosition(newLocation);
    }
  }
  

  centerMap() {
    if (this.map && this.userMarker) {
      const markerPosition = this.userMarker.getPosition();
      if (markerPosition) {
        if (this.centerMapAutomatically) {
          this.map.panTo(markerPosition);
        }
      }
    }
  }
  

  async getDirections() {
    try {
      if (this.destination) {
        const originCoords = {
          lat: this.userMarker.getPosition().lat(),
          lng: this.userMarker.getPosition().lng()
        };
  
        const directions = await this.gmaps.getDirections(originCoords, this.destination);
        this.displayRoute(directions);
  
        // Desactivar el centrado automático después de mostrar la ruta
        this.centerMapAutomatically = false;
      }
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
    }
  }
  

  displayRoute(directions: any) {
    const directionsRenderer = new this.googleMaps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    directionsRenderer.setDirections(directions);
  }

  private async handleTripDetails(tripDetails: any[]) {
    try {
      if (tripDetails.length > 0) {
        const tripDetail = tripDetails[0]; // Tomar el primer elemento del array
  
        const origen = tripDetail.origen;
        const destino = tripDetail.destino;
  
        console.log('Origen:', origen);
        console.log('Destino:', destino);
  
        const origenCoordinates = await this.gmaps.geocodeAddress(origen);
        const destinoCoordinates = await this.gmaps.geocodeAddress(destino);
  
        console.log('Coordenadas de origen:', origenCoordinates);
        console.log('Coordenadas de destino:', destinoCoordinates);
  
        this.destination = destinoCoordinates;
  
        this.getDirections();
      } else {
        console.error('No se encontraron detalles de viaje.');
      }
    } catch (error) {
      console.error('Error al procesar los detalles del viaje:', error);
    }
  }
}
