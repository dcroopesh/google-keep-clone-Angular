import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelsComponent } from '../labels/labels.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment'
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { FormControl } from '@angular/forms';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  labels = [] ;
  signOut=false;
  firstName;
  lastName;
  email;
  selectedFile: ImageSnippet;
  profilePic;
  grid=true
  imageData
  searchText = new FormControl()
  
  constructor(private route: Router,public dialog: MatDialog,private requests: UserService,
    private data : DataService) { 
    this.getLabels(); 
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.profilePic = environment.BaseURl + localStorage.getItem('userImage');

}

  ngOnInit(): void {
  }

  dispalySignOut(){
    this.signOut = ! this.signOut;
  }

  sendData(){
    this.data.searchNote(this.searchText)
  }

 showNotes(){
   this.route.navigate(['/home'])
 }
 showRemainders(){
  this.route.navigate(['/home/remainder'])

 }
 showArchive(){
  this.route.navigate(['/home/archive'])
}

showLabels(labelname){
  this.route.navigate(['/home/label/' + labelname])

}

getLabels(){
  this.requests.getNoteLabelList()
    .subscribe((response) =>{
    this.labels = response['data']['details'];
    this.data.changeLabel(this.labels)
  })

}

showDialog(){

    const dialogRef = this.dialog.open(LabelsComponent, {width: '300px',
    data: {label: this.labels}
    })
  }

  uploadImageDialog(){
    
      // document.getElementById("FileUpload").click();
      console.log("asd")
      const dialogRef = this.dialog.open(ProfilePicComponent, {width: '400px',height :"450px"})
      
    
  }

  logout(){
    this.requests.logout()
    .subscribe((response)=>{
      localStorage.clear();
      this.route.navigate(['/login'])

    },
    (error)=>{
      console.log(error);
    })
  }


  showGridOrList(){
    
    this.grid = ! this.grid
    this.data.changeView(! this.grid)
  }



  
}

  
