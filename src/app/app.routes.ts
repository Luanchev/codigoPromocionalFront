import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/validar-codigo/validar-codigo.component').then(m => m.ValidarCodigoComponent),
    title: "validar codigo"
  },
  {
    path: 'validador',
    loadComponent: () => import('./home/validador/validador.component').then(m => m.ValidadorComponent),
    title: "Validador"
  }

];
