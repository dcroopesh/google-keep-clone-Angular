import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent implements OnInit {

  
  item
  displayDate = ''
  collaborators = []
  noteLabels = []
  month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']


  constructor(public dialogRef: MatDialogRef<UpdateNotesComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private requests : UserService,public dialog: MatDialog
  ) { 
        this.item = data
        
  }

  ngOnInit(): void {

    this.collaborators[this.item.id] = this.item['collaborators'];
    this.noteLabels = this.item.noteLabels
    let dateUTC = this.item['reminder'][0]
    console.log(this.noteLabels)
    console.log(this.item)
    if (dateUTC != undefined){
      
      let dateIST = new Date(dateUTC)    ;

      this.displayDate = ' ' +  this.month[dateIST.getMonth()] + ' ';
      this.displayDate += dateIST.getDate() + ' ';
      var hour = dateIST.getHours() , meridian = "AM"
      if(hour > 12){
        hour -= 12;
        meridian = "PM"
      }

      this.displayDate += hour + ':' + (dateIST.getMinutes()<10?'0':'') + dateIST.getMinutes() + ' ' + meridian;

  }
}

  send(){
    // this.closeDialog()
    let dataObject = {

      noteId  : this.item.id,
      title   : document.getElementById("titlee").textContent,
      description: document.getElementById("description").textContent
    }
    this.requests.updateNotes(dataObject)
    .subscribe((response) =>{
      console.log(response)
    },
    (error) =>{
      console.log(error)
    });

  }

    updateColor(colour){

      this.item.color = colour
      let dataObject = {
        color : colour,
        noteIdList : [this.item.id],
  
      }
      this.requests.changesColorNotes(dataObject)
      .subscribe((response) => {
        // this.send();
      },(error) => {
        console.log(error)
      })
    }

    addUpdateReminderNotes(date){
    
      let dateIST = new Date(date)    ;

      this.displayDate = ' ' +  this.month[dateIST.getMonth()] + ' ';
      this.displayDate += dateIST.getDate() + ' ';
      var hour = dateIST.getHours() , meridian = "AM"
      if(hour > 12){
        hour -= 12;
        meridian = "PM"
      }

      this.displayDate += hour + ':' + (dateIST.getMinutes()<10?'0':'') + dateIST.getMinutes() + ' ' + meridian;

      let dataObject = {
        reminder : date,
        noteIdList : [this.item.id]
      }
    
      this.requests.addUpdateReminderNotes(dataObject)
      .subscribe((response) => {
        // this.send();
      },(error) => {
        console.log(error)
      })
      }

      removeReminderNotes(){
        let id = []
        this.displayDate = ''
        id.push(this.item.id)
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
        data: {item: this.item.id ,collab : this.collaborators[this.item.id]}
        });
  
    }


    closeDialog() {
      this.dialogRef.close();
    }

    removeLabel(label){

      const index = this.noteLabels.indexOf(label);
      if (index > -1) {
        this.noteLabels.splice(index, 1);
      }
      this.noteLabels = this.noteLabels   

      this.requests.remove(label.id,this.item.id)
      .subscribe((response) =>{
        // this.send();
  
      },
      (error) => {
        console.log(error)
  
      })
    }

    addLabel(labelArray){
      console.log(labelArray)

      for(let label of labelArray){
        this.noteLabels.push(label) 
      }
        console.log(this.noteLabels) 
      let labelId = labelArray[0].id;
  
      this.requests.add(labelId,this.item.id)
      .subscribe((response) =>{
        this.send();
  
      },
      (error) => {
        console.log(error)
  
      })
    }

    archiveNotes(){
    
      let dataObject = {
        isArchived : true,
        noteIdList : [this.item.id]
      }
  
      this.requests.archiveNotes(dataObject)
      .subscribe((response) => {
        this.closeDialog()
      },(error) => {
        console.log(error)
      })
  
      
  
  
    }


    
  

  




}
