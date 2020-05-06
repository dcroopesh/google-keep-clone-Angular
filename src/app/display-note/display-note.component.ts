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
  displayDate = [];

  month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

  constructor(private requests : UserService,public dialog: MatDialog) {
    console.log("abc",this.notesObjects);

   }

  ngOnInit(): void {};
  
  

  ngDoCheck()	{
    var n = this.notesObjects;
      for(let i = 0; i < n.length;i++){

      let dateUTC = n[i]['reminder'][0]
          if (dateUTC != undefined){
            let dateIST = new Date(dateUTC);

      this.displayDate[i]= ' ' +  this.month[dateIST.getMonth()] + ' ';
      this.displayDate[i] += dateIST.getDate() + ' ';
      var hour = dateIST.getHours() , meridian = "AM"
      if(hour > 12){
        hour -= 12;
        meridian = "PM"
      }
  
      this.displayDate[i] += hour + ':' + (dateIST.getMinutes()<10?'0':'') + dateIST.getMinutes() + ' ' + meridian;
    }
    else{
      this.displayDate[i] = '';
    }
    }
    this.displayDate = this.displayDate.reverse();
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
