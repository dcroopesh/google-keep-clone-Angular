import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelsComponent } from '../labels/labels.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  labels = [] ;
  signOut=false;
  
  constructor(private route: Router,public dialog: MatDialog,private requests: UserService,
    private data : DataService) { 
   console.log("homescons")
    this.getLabels(); 
  }

  ngOnInit(): void {
  }

  dispalySignOut(){
    this.signOut = ! this.signOut;
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
    console.log("subs")
    this.labels = response['data']['details'];
    this.data.changeLabel(this.labels)
  })

}

showDialog(){

    const dialogRef = this.dialog.open(LabelsComponent, {width: '300px',
    data: {label: this.labels}
})}
    }
