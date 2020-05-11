import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, DoCheck, OnChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { CollaboratorComponent } from '../Icons/collaborator/collaborator.component';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';


@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit,OnChanges{

  @Input() notesObjects;
  show = false;
  @Output() notifyNote = new EventEmitter();
  @Output() onUNArchive = new EventEmitter<string>();
  newNote="True"
  noteId;
  remainderArray = [];
  displayDate = [];
  collaborators = {};
  month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

  constructor(private requests : UserService,public dialog: MatDialog) {}

  ngOnInit(): void {};
  
  ngOnChanges()	{
    var n = this.notesObjects;
    this.collaborators = []
    this.displayDate = [];
      for(let i = 0; i < n.length;i++){

      //to send data to colab dialog  
      this.collaborators[n[i]['id']] = n[i]['collaborators'];

      let dateUTC = n[i]['reminder'][0]
          if (dateUTC != undefined){
            let dateIST = new Date(dateUTC)    ;

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

  send(msg?){
    this.notifyNote.emit()
  }

  unarchive(){
    this.onUNArchive.emit();
  }

  updateColor(colour){
    console.log(colour)

  let dataObject = {
    color : colour,
    noteIdList : [this.noteId],

  }
    this.requests.changesColorNotes(dataObject)
    .subscribe((response) => {
      this.send();
    },(error) => {
      console.log(error)
    })
  }

  archiveNotes(){
    
    let dataObject = {
      isArchived : true,
      noteIdList : [this.noteId]
    }

    this.requests.archiveNotes(dataObject)
    .subscribe((response) => {
      this.send();
    },(error) => {
      console.log(error)
    })

    


  }

  addUpdateReminderNotes(date){
    
  let dataObject = {
    reminder : date,
    noteIdList : [this.noteId]
  }

  this.requests.addUpdateReminderNotes(dataObject)
  .subscribe((response) => {
    this.send();
  },(error) => {
    console.log(error)
  })
  }

  addLabel(labelArray){
    console.log("add","")
    let labelId = labelArray[0].id;

    this.requests.add(labelId,this.noteId)
    .subscribe((response) =>{
      this.send();

    },
    (error) => {
      console.log(error)

    })
  }

  removeLabel(label){

    this.requests.remove(label.id,this.noteId)
    .subscribe((response) =>{
      this.send();

    },
    (error) => {
      console.log(error)

    })
  }

  removeReminderNotes(){
    let id = []
    id.push(this.noteId)
    let dataObject = {
      noteIdList : id
    }
    this.requests.removeReminderNotes(dataObject)
    .subscribe((response) =>{
      this.send();

    },
    (error) => {
      console.log(error)

    })
  }

  showColabDialog(){


      const dialogRef = this.dialog.open(CollabDialogComponent, {
      width: '450px',
      data: {item: this.noteId ,collab : this.collaborators[this.noteId]}
      });

  }
  
}
