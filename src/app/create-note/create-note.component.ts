import { Component, OnInit, Output, EventEmitter, OnChanges, AfterContentInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit{

  hidden = true;
  noteColour="#ffffff";
  dataObject;
  archive = false;
  labels = [];
  removable = true;
  selectable = true;
  labelsIdArray = [];
  remainderDate = '';
  displayDate = '';
  month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

  @Output() onNoteCreate = new EventEmitter<string>();

  newNote = false;
  constructor(private requests : UserService ,private util : UtilityService) {

   }
  
  
  ngOnInit(): void {

  }


  ngAfterContentInit(): void{
   
  }

  hideNote(){
    console.log("aaaaaaaaaaaaa")
    document.getElementById("container").style.visibility = "hidden";
  }
  
  getColor(color){
    this.noteColour = color;
    document.getElementById("container").style.backgroundColor = this.noteColour;
  }


  save(message?){


    for(let label of this.labels){
       this.labelsIdArray.push(label['id'])
    }

    console.log(this.labelsIdArray)
    console.log(Array.isArray(this.labelsIdArray))


   this.dataObject =  {
      title       : document.getElementById("title").textContent,
      description : document.getElementById("description").textContent,
      isPined     : false,
      color       : this.noteColour,   
      isArchived  : this.archive,
      labelIdList : this.labelsIdArray,
      reminder    : this.remainderDate,
      collaberators : []
    }

    this.noteColour = "#ffffff";
    this.archive = false;
    this.labels = [];
    this.labelsIdArray = [];
    this.remainderDate = '';

   this.requests.createNotes(this.dataObject) 
    .subscribe((response) =>{
      console.log("Note created")
      this.hidden = !this.hidden;
      this.onNoteCreate.emit("note created");
     
    },
    (error) => {
      console.log("Didn't create a note")
      this.hidden = !this.hidden
    })
  }

  hide(){
    this.hidden = !this.hidden
  }

  Archive(){
    this.archive = true;
    this.save();
  }

  label(labelArray){
    console.log(labelArray)
    this.labels = labelArray
    console.log(labelArray.length )

    }

  remove(label): void {
    const index = this.labels.indexOf(label);
    console.log("del"+label)
    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  checkLabel(labelId){
    for(let i =0 ; i < this.labelsIdArray.length ;i++){
      if(labelId === this.labelsIdArray[i])
      return true;
    }
    return false
  }

  getSelectedDate(date){
    console.log("create",date);
    this.remainderDate = date;
    this.displayDate = ' ' +  this.month[date.getMonth()] + ' ';
    this.displayDate += date.getDate() + ' ';
    var hour = date.getHours() , meridian = "AM"
    if(hour > 12){
      hour -= 12;
      meridian = "PM"
    }

    this.displayDate += hour + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + ' ' + meridian;
    
    
  }

  removeRemainder(){
    console.log("remove")

    this.remainderDate = '';
  }
}
