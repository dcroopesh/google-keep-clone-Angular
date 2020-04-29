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
import { NotesComponent } from './notes/notes.component';
import { RemaindersComponent } from './remainders/remainders.component';
import { DisplayNoteComponent } from './display-note/display-note.component';


const routes: Routes = [

  { path: '',redirectTo: '/registration',pathMatch:"full"},   
  { path: 'registration' , component: RegistrationComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'forgotpassword' , component: ForgotPasswordComponent},
  { path: 'display' , component: DisplayNoteComponent},

  { path: 'practice' , component: FlexDesignComponent},
  { path: 'resetpassword/:token' , component : ResetpasswordComponent},
  { path: 'icons' , component: IconsComponent},
  { path: 'cnote' , component: CreateNoteComponent},
  { path: 'home' , component: HomeComponent ,
    children : [{path : 'note' , component : NotesComponent},
                {path : 'remainder' , component : RemaindersComponent}]
 },
  { path: '**' , component: PageNotFoundComponent},
  
  
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }