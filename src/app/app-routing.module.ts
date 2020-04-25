import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [

  { path: '',redirectTo: '/registration',pathMatch:"full"},   
  { path: 'registration' , component: RegistrationComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'forgot-password' , component: ForgotPasswordComponent},
  { path: '**' , component: PageNotFoundComponent}
  
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }