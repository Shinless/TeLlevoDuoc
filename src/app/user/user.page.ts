import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  Datos_usuario: UserData | undefined;
  idUserHtmlRouterLink: any;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.Datos_usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
    console.log("Valor obtenido desde URL: ",this.idUserHtmlRouterLink);
   }

  ngOnInit() {
  }

}
