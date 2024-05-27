import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ServiciosComponent } from '../components/servicios/servicios.component';
import {QuienesComponent} from '../components/quienes/quienes.component';
import {ContactoComponent} from '../components/contacto/contacto.component';
import {LoginComponent} from '../components/login/login.component';
import {AccountComponent} from '../components/account/account.component';
import {SearchComponent} from '../components/search/search.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DetailsComponent } from '../components/details/details.component';
import { NewpasswordComponent } from '../components/newpassword/newpassword.component';
import { NewemailComponent } from '../components/newemail/newemail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'quienes', component: QuienesComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'account', component: AccountComponent },
    { path: 'account/search', component: SearchComponent },
    { path: 'account/search/details', component: DetailsComponent },
    { path: 'account/newpassword', component: NewpasswordComponent },
    { path: 'account/newemail', component: NewemailComponent },


];
