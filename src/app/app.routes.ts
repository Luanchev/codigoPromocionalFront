import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/validador/validador.component').then(m => m.ValidadorComponent),
    title: "Validador"
  },
];
