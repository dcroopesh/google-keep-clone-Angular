import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexDesignComponent } from './flex-design/flex-design.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

import { UtilityService } from './services/utility.service';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { IconsComponent } from './icons/icons.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesComponent } from './notes/notes.component';
import {MatDividerModule} from '@angular/material/divider';
import { RemaindersComponent } from './remainders/remainders.component';
import { DisplayNoteComponent } from './display-note/display-note.component';
import { UpdateNotesComponent } from './update-notes/update-notes.component';
import { ReminderComponent } from './Icons/reminder/reminder.component';
import { CollaboratorComponent } from './Icons/collaborator/collaborator.component';
import { ColorComponent } from './Icons/color/color.component';
import { ImageComponent } from './Icons/image/image.component';
import { ArchiveComponent } from './Icons/archive/archive.component';
import { MoreComponent } from './Icons/more/more.component';
import { CloseComponent } from './Icons/close/close.component';
import { PinComponent } from './Icons/pin/pin.component';
import { ArchiveSidenavComponent } from './archive-sidenav/archive-sidenav.component';
import { UnarchiveComponent } from './Icons/unarchive/unarchive.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    FlexDesignComponent,
    LoginComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ResetpasswordComponent,
    HomeComponent,
    IconsComponent,
    CreateNoteComponent,
    NotesComponent,
    RemaindersComponent,
    DisplayNoteComponent,
    UpdateNotesComponent,
    ReminderComponent,
    CollaboratorComponent,
    ColorComponent,
    ImageComponent,
    ArchiveComponent,
    MoreComponent,
    CloseComponent,
    PinComponent,
    ArchiveSidenavComponent,
    UnarchiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule, 
    AppRoutingModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule
    
    
  ],
  providers: [
    HttpService,
    UtilityService,
    UserService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
