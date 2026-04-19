import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'inventario',
    loadComponent: () => import('./page/inventario/inventario.page').then(m => m.InventarioPage),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'farmaceutico', 'vendedor'] }
  },
  {
    path: 'venta',
    loadComponent: () => import('./page/venta/venta.page').then(m => m.VentaPage),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'farmaceutico', 'vendedor'] }
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./page/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'no-autorizado',
    loadComponent: () => import('./page/no-autorizado/no-autorizado.page').then(m => m.NoAutorizadoPage),
  }
];