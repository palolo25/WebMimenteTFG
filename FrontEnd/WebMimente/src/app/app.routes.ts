import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'servicios', component: ServiciosComponent },
];
