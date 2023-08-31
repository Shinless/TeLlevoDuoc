import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserData } from '../models/UserData';
import { ActivatedRoute, Router } from '@angular/router';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from '@ionic-native/google-maps';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  @ViewChild('map', { static: true })
  mapElementRef!: ElementRef; //Se crea una variable para guardar el elemento del mapa
  googleMaps: any; //Se crea una variable para guardar el modulo de google
  center = { lat: 18.5204, lng: 73.8567 }; //Se crea una variable para guardar la ubicacion del mapa
  map: any; //Se crea una variable para guardar el mapa
  Datos_usuario: UserData | undefined; //Se crea una variable para guardar los datos del usuario
  idUserHtmlRouterLink: any; //Se crea una variable para guardar el id del usuario
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private gmaps: GmapsService, private renderer: Renderer2) {
    this.Datos_usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
    console.log("Valor obtenido desde URL: ",this.idUserHtmlRouterLink);
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadMap();//Se llama al metodo para cargar el mapa
  }

  async loadMap() {
    try{
      let googleMaps: any = await this.gmaps.loadGoogleMaps(); //Se carga el modulo de google
      this.googleMaps = googleMaps; //Se guarda el modulo de google en la variable creada
      const mapEl = this.mapElementRef.nativeElement; //Se guarda el elemento del mapa en la variable creada
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng); //Se crea una variable para guardar la ubicacion del mapa
      this.map = new googleMaps.Map(mapEl,
           { //Se crea el mapa
            center: location,
            zoom: 12}); 
      this.renderer.addClass(mapEl, 'visible'); //Se agrega la clase visible al mapa

    } catch(e){
      console.log("Error al cargar el mapa: ", e);
    }
    
  }

}
