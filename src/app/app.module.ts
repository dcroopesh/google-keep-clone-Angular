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
import {MatChipsModule} from '@angular/material/chips';


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
import { LabelsComponent } from './labels/labels.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DataService } from './services/data.service';
import { LabelsSidenavComponent } from './labels-sidenav/labels-sidenav.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CollabDialogComponent } from './collab-dialog/collab-dialog.component';
import { AuthGuard } from './auth.guard';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuesAnsComponent } from './ques-ans/ques-ans.component';
import { StarRatingModule } from 'angular-star-rating';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DisplayNotePipe } from './display-note/display-note.pipe';

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
    UnarchiveComponent,
    LabelsComponent,
    LabelsSidenavComponent,
    CollabDialogComponent,
    ProfilePicComponent,
    QuesAnsComponent,
    DisplayNotePipe,
    
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
    MatTooltipModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatAutocompleteModule,
    NgbModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    StarRatingModule.forRoot(),
    ImageCropperModule

    
    
    
  ],
  providers: [
    HttpService,
    UtilityService,
    UserService,
    DataService,
    MatDatepickerModule,
    AuthGuard
    
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
