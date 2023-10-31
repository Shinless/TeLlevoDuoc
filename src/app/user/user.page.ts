import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserData } from '../models/UserData';
import { ActivatedRoute, Router } from '@angular/router';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../services/Storage/storage.service';
import { ConnectionService } from '../services/connections/connection.service';


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
  id_user: any; // ID del usuario actual
  user_name : string = '';

  constructor(
    //private router: Router,
    //private activatedRoute: ActivatedRoute,
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private Storage: StorageService,
    private connectionService: ConnectionService,
  ) {
    // Obtiene los datos del usuario de la navegación y el ID de la URL
    //this.Datos_usuario = this.router.getCurrentNavigation()?.extras.state?.['userInfoSend'];
    //this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
    this.Storage.obtener('IdUser').then((data) => {
      this.id_user = parseInt(data?.valueOf()!);
      console.log(this.id_user);});
    this.Storage.obtener('NameUser').then((data) => {
      this.user_name = data || "";
      console.log(this.user_name);});
  }

  ngOnInit() {
    // Lógica de inicialización al cargar la página
  }

  getNombreUsuario(){
      this.connectionService.getUserById(this.id_user).subscribe(user => {
      this.Datos_usuario = user;
      this.user_name = this.Datos_usuario?.name;
      console.log(this.Datos_usuario);
    });
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
