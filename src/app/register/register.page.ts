import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regform: FormGroup | undefined;

  constructor(public formBuilder:FormBuilder, public loadingController:LoadingController, public toastController:ToastController, public router:Router, public authService:AutheticationService) { 

  }

  ngOnInit() {
    this.regform = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: ['',Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
    }
    )
  }

  get errorControl() {
    return this.regform?.controls;
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.regform?.valid){
     // const user = await this.authService.registerUser(this.regform?.value.email, this.regform?.value.password);
    }
  }
}
