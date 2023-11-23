import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  @ViewChild('addressInput') addressInput!: ElementRef;
  tipoUbicacion: string;
  googleMaps: any;
  map: any;
  geocoder: any;  
  userMarker: any;
  selectedLocation: any;
   // Variable para almacenar la ubicación seleccionada

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private navParams: NavParams,
    
    

  ) {

    this.tipoUbicacion = this.navParams.get('tipoUbicacion')
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
        zoom: 15,
      });

      this.renderer.addClass(mapEl, 'visible');

      // Añadir marcador
      this.userMarker = new googleMaps.Marker({
        position: location,
        map: this.map,
        title: 'Ubicación actual',
        icon: {
          url: 'assets/icon/pin.png',
          scaledSize: new googleMaps.Size(40, 50),
        },
        animation: googleMaps.Animation.BOUNCE,
      });

      // Inicializar el geocoder
      this.geocoder = new googleMaps.Geocoder();

      // Agregar evento de clic al mapa
      googleMaps.event.addListener(this.map, 'click', (event: any) => {
        this.handleMapClick(event.latLng);
      });
    } catch (e) {
      console.log('Error al cargar el mapa:', e);
    }
  }

  handleMapClick(latLng: any) {
    // Utilizar el geocoder para obtener la dirección
    this.geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.selectedLocation = {
          address: results[0].formatted_address,
          coordinates: {
            lat: latLng.lat(),
            lng: latLng.lng(),
          },
        };

        // Actualizar el marcador de la ubicación seleccionada
        this.updateMarker(this.selectedLocation.coordinates);

        this.renderer.setProperty(this.addressInput.nativeElement, 'value', this.selectedLocation.address);
      }
    });
  }

  handleAddressInputChange() {
    // Función para manejar cambios en la entrada de texto
    const address = this.addressInput.nativeElement.value;

    // Utilizar el geocoder para obtener coordenadas desde la dirección ingresada
    this.geocoder.geocode({ address: address }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.selectedLocation = {
          address: results[0].formatted_address,
          coordinates: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          },
        };

        // Centrar el mapa en las coordenadas obtenidas
        this.map.panTo(this.selectedLocation.coordinates);

        // Actualizar el marcador de la ubicación seleccionada
        this.updateMarker(this.selectedLocation.coordinates);
      }
    });
  }

  updateMarker(coordinates: any) {
    if (this.userMarker) {
      const newLocation = new this.googleMaps.LatLng(coordinates.lat, coordinates.lng);
      this.userMarker.setPosition(newLocation);
    }
  }
  confirmarUbicacion() {
    // Puedes enviar datos adicionales si es necesario
    this.modalController.dismiss({
      tipoUbicacion: this.tipoUbicacion,
      selectedLocation: this.selectedLocation,
    });
  }
}
