import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GoogleMaps } from '@ionic-native/google-maps/ngx'; // Importa el módulo de Google Maps si es necesario
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el uso de ngModel
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; // Agrega la importación de ForgotPasswordComponent
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule desde @angular/fire/compat
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa AngularfireauthModule desde @angular/fire/compat/auth
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent, ForgotPasswordComponent], // Agrega ForgotPasswordComponent aquí
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, 
  AngularFireModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)], // Agrega FormsModule aquí
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GoogleMaps, // Agrega GoogleMaps si es necesario
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
