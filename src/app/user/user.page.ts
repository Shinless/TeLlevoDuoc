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
  mapElementRef!: ElementRef;
  googleMaps: any;
  center = { lat: -33.033667, lng: -71.533596 };
  map: any;
  Datos_usuario: UserData | undefined;
  idUserHtmlRouterLink: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gmaps: GmapsService,
    private renderer: Renderer2
  ) {
    this.Datos_usuario = this.router.getCurrentNavigation()?.extras.state?.['userInfoSend'];
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 15
      });
      this.renderer.addClass(mapEl, 'visible');
    } catch (e) {
      console.log('Error al cargar el mapa:', e);
    }
  }
}
