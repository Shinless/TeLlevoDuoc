import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'viaje',
    loadChildren: () => import('./crear-viaje/crear-viaje.module').then(m => m.CrearViajePageModule),
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then(m => m.HistorialPageModule),
  },
  {
    path: 'buscar-viaje',
    loadChildren: () => import('./buscar-viaje/buscar-viaje.module').then( m => m.BuscarViajePageModule)
  },
  {
    path: 'ruta/:id_viaje',
    loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
