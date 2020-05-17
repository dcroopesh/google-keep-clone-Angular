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
import { ArchiveComponent } from './Icons/archive/archive.component';
import { ArchiveSidenavComponent } from './archive-sidenav/archive-sidenav.component';
import { LabelsSidenavComponent } from './labels-sidenav/labels-sidenav.component';
import { AuthGuard } from './auth.guard';
import { QuesAnsComponent } from './ques-ans/ques-ans.component';


const routes: Routes = [

  { path: '',redirectTo: '/registration',pathMatch:"full"},   
  { path: 'registration' , component: RegistrationComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'forgotpassword' , component: ForgotPasswordComponent},
  { path: 'trail' , component: FlexDesignComponent},

  { path: 'resetpassword/:token' , component : ResetpasswordComponent},
  { path: 'home' , component: HomeComponent , canActivate : [AuthGuard],
    children : [{path : '' , component : NotesComponent},
                {path : 'remainder' , component : RemaindersComponent},
                { path: 'archive' , component: ArchiveSidenavComponent},
                { path: 'label/:labelname' , component: LabelsSidenavComponent},
                { path: 'questionAnswer/:noteId' , component: QuesAnsComponent} ]
              
 },
  { path: '**' , component: PageNotFoundComponent},
  
  
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }