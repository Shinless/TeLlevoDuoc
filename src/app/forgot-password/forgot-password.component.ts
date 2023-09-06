import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserLogin } from '../models/UserLogin';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string;

  constructor(private modalController: ModalController) {

    this.email = '';

   }

  closeModal() {
    this.modalController.dismiss();
  }


}
