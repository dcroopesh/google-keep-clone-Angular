import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, DoCheck, OnChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { CollaboratorComponent } from '../Icons/collaborator/collaborator.component';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { viewClassName } from '@angular/compiler';
import { DisplayNotePipe } from './display-note.pipe'


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
  comment = [];
  commented = []
  width = "30%"
  listView;
  collaborators = {};
  searchText

  month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

  constructor(private requests : UserService,public dialog: MatDialog, private route : Router,
    private data : DataService) { 
      
      this.changeView();
    }

  ngOnInit(): void {
    //this.changeView();

  };
  
  ngOnChanges()	{


    var n = this.notesObjects;
    this.collaborators = []
    this.displayDate = [];
    this.comment = [];

    this.data.searchText.subscribe(next =>{
      this.searchText = next;
    })
      for(let i = 0; i < n.length;i++){

      //to send data to colab dialog  
      this.collaborators[n[i]['id']] = n[i]['collaborators'];
      
      if (n[i]['questionAndAnswerNotes'].length > 0){
        this.commented[i] = true
        this.comment[i] = n[i]['questionAndAnswerNotes'] 
      }
      else{
        this.commented[i] = false
        this.comment[i] = null;
      }
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

    this.commented = this.commented.reverse();
    this.comment = this.comment.reverse();
    this.displayDate = this.displayDate.reverse();
  }


  changeView(){
    this.data.gridOrList.subscribe(next =>{
      this.listView = next;
      if(this.listView == true){
        console.log("chnage view")
        this.width = "100%";
      }else{
        this.width = "30%";
    
      }
  })
}


  Show(){
    this.show = !this.show;
  }

  showQues(){
    this.route.navigate(['/home/questionAnswer/' + this.noteId])
  }

  showDialog(item){
    
    
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: '450px',
     
      data: item,
      panelClass: 'mat-no-padding-dialog',
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
