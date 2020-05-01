import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';


@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  @Input() notesObjects;
  show = false;
  @Output() onDelete = new EventEmitter<string>();
  @Output() onUNArchive = new EventEmitter<string>();

  noteId;
  constructor(private requests : UserService,public dialog: MatDialog) {
   
   }

  ngOnInit(): void {};
  

  Show(){
    console.log("sssssssssssss")
    this.show = !this.show;
  }

  showDialog(item){
    
    console.log(item.id)
    
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: '450px',
      data: {item:item}
      });
       
  }

  getItem(item){
    this.noteId = item.id;
  }

  send(msg){
    this.onDelete.emit("deleted")
  }

  archive(){
    this.onUNArchive.emit();
  }
  
  
  

}
