import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { UserLogin } from '../models/UserLogin';
import { TripData } from '../models/TripData';
import { UserData } from '../models/UserData';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule]})
export class LoginPage implements OnInit {

  listUser : UserData[] = [
    new UserData('Jamalia','Clark','velit.dui.semper@icloud.edu','C','Nolans'),
    new UserData('Vielka','Haley','venenatis.vel@aol.net','P','Brody T. Mcclure'),
    new UserData('Ezekiel','Mcknight','montes.nascetur.ridiculus@yahoo.ca','C','Lucius I. Schneider'),
    new UserData('Hayden','Howell','lectus.cum.sociis@protonmail.ca','C','Jolie P. Atkinson'),
  ];

  userLoginModal: UserLogin = {
    email: '',
    password: ''
  };


  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: UserLogin): boolean{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].email == userLoginInfo.email) && (this.listUser[i].password == userLoginInfo.password)){
        console.log('User Loged...', this.userLoginModal.email, this.userLoginModal.password);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if(this.listUser[i].type == 'C'){
          let sendInfo = this.route.navigate(['/User'], userInfoSend);
          return true;
        }else{
          let sendInfo = this.route.navigate(['/User'], userInfoSend);
          return true;
        }
      }
    }
    this.userLoginModalRestart();
    return false;
    
  }

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }
}
