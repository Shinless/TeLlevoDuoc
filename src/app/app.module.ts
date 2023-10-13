import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GoogleMaps } from '@ionic-native/google-maps/ngx'; // Importa el módulo de Google Maps si es necesario
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el uso de ngModel
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; // Agrega la importación de ForgotPasswordComponent
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ForgotPasswordComponent, RegisterComponent], // Agrega ForgotPasswordComponent aquí
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,HttpClientModule], // Agrega FormsModule aquí
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GoogleMaps, // Agrega GoogleMaps si es necesario
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
