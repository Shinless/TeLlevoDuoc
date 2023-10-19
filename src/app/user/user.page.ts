import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserData } from '../models/UserData';
import { ActivatedRoute, Router } from '@angular/router';
import { GmapsService } from '../services/gmaps/gmaps.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild('map', { static: true })
  mapElementRef!: ElementRef; // Referencia al elemento del mapa en la plantilla
  googleMaps: any; // Objeto para el servicio de mapas de Google
  center = { lat: -33.033667, lng: -71.533596 }; // Coordenadas del centro del mapa
  map: any; // Objeto del mapa
  Datos_usuario: UserData | undefined; // Datos del usuario actual
  idUserHtmlRouterLink: any; // ID del usuario obtenido de la URL

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gmaps: GmapsService,
    private renderer: Renderer2
  ) {
    // Obtiene los datos del usuario de la navegación y el ID de la URL
    this.Datos_usuario = this.router.getCurrentNavigation()?.extras.state?.['userInfoSend'];
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    // Lógica de inicialización al cargar la página
  }

  ngAfterViewInit() {
    // Lógica que se ejecuta después de que los elementos de la vista se inicializan
    this.loadMap();
  }

  async loadMap() {
    try {
      // Carga el módulo de Google Maps
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement; // Elemento del mapa en la plantilla
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng); // Ubicación del mapa
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 15
      }); // Crea el mapa
      this.renderer.addClass(mapEl, 'visible'); // Agrega la clase 'visible' al mapa
    } catch (e) {
      console.log('Error al cargar el mapa:', e);
    }
  }
}
