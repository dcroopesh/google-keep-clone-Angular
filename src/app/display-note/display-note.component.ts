import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, DoCheck } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';


@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit,DoCheck {

  @Input() notesObjects;
  show = false;
  @Output() onDelete = new EventEmitter<string>();
  @Output() onUNArchive = new EventEmitter<string>();
  newNote="True"
  noteId;
  remainderArray = [];
  constructor(private requests : UserService,public dialog: MatDialog) {
    console.log("abc",this.notesObjects);

   }

  ngOnInit(): void {};
  
  

  ngDoCheck()	{
    console.log(this.notesObjects.length)

    for(let i = 0 ; i < this.notesObjects.length ; i++){
      
      console.log(this.notesObjects[i]['reminder'][0])
    }
  }

  Show(){
    this.show = !this.show;
  }

  showDialog(item){
    
    
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

  unarchive(){
    this.onUNArchive.emit();
  }



  
  
  

}
