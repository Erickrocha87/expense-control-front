import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDataComponent } from './pages/user-data/user-data.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./pages/sing-up/sing-up.component').then(c => c.SingUpComponent)
    },
    {
        path: 'painel-do-usuario',
        component: UserDataComponent, canActivate: [AuthGuard]
    }
   
];
