import { MisClases } from './pages/mis-clases/mis-clases.component';
import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio.component';
import { Login } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: Inicio },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.Login),
  },
  {
    path: 'my-classes',
    loadComponent: () => import('./pages/mis-clases/mis-clases.component').then((m) => m.MisClases),
  },
  {
    path: 'class/:id',
    loadComponent: () =>
      import('./pages/clase-detalle/clase-detalle.component').then((m) => m.ClaseDetalle),
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./pages/admin-usuarios/admin-usuarios.component').then((m) => m.AdminUsuarios),
  },
  {
    path: 'admin/classes/:id',
    loadComponent: () =>
      import('./pages/admin-clases-detalle/admin-clases-detalle.component').then(
        (m) => m.AdminClaseDetalle,
      ),
  },
  {
    path: 'admin/classes',
    loadComponent: () =>
      import('./pages/admin-clases/admin-clases.component').then((m) => m.AdminClases),
  },
];
