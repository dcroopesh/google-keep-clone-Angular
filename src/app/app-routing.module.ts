import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { FlexDesignComponent } from './flex-design/flex-design.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { IconsComponent } from './icons/icons.component';
import { CreateNoteComponent } from './create-note/create-note.component';


const routes: Routes = [

  { path: '',redirectTo: '/registration',pathMatch:"full"},   
  { path: 'registration' , component: RegistrationComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'forgotpassword' , component: ForgotPasswordComponent},
  { path: 'home' , component: HomeComponent},
  { path: 'practice' , component: FlexDesignComponent},
  { path: 'resetpassword/:token' , component : ResetpasswordComponent},
  { path: 'icons' , component: IconsComponent},
  { path: 'cnote' , component: CreateNoteComponent},

  { path: '**' , component: PageNotFoundComponent}
  
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }