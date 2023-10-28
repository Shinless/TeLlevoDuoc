import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearViajeComponent } from './crear-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: CrearViajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearViajePageRoutingModule {}
