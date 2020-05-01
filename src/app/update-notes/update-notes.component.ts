import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent implements OnInit {

  title:string;
  description:string;
  id;
  constructor(public dialogRef: MatDialogRef<UpdateNotesComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private requests : UserService
  ) { 
        this.title = data.item.title;
        this.description = data.item.description;
        this.id = data.item.id;
  }

  ngOnInit(): void {

  }

  send(message){
    console.log("update")
    let dataObject = {
      noteId: this.id,
      title: this.title,
      description: this.description
    }
    this.requests.updateNotes(dataObject)
    .subscribe((response) =>{
      console.log(response)
    },
    (error) =>{
      console.log(error)
    });
  }

  




}
