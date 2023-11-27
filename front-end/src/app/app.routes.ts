import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/Home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignUpComponent, title: 'SignUp' },
];
