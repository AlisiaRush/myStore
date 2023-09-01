import { Route } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';

export const appRoutes: Route[] = [
  { path: '', component: UserLoginComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
];
