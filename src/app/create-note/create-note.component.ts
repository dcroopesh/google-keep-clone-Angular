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
  labels ;
  removable = true;
  selectable = true;
  labelsId;

  @Output() onNoteCreate = new EventEmitter<string>();

  newNote = false;
  constructor(private requests : UserService ,private util : UtilityService) {

   }
  
  
  ngOnInit(): void {

  }


  ngAfterContentInit(): void{
   
  }
  
  getColor(color){
    this.noteColour = color;
    document.getElementById("container").style.backgroundColor = this.noteColour;
  }


  save(message?){

  if(this.labels == null){
  this.labelsId = [ ];
  }

   this.dataObject =  {
      title: document.getElementById("title").textContent,
      description: document.getElementById("description").textContent,
      isPined: false,
      color: this.noteColour,   
      isArchived: this.archive,
      labelIdList: this.labelsId,
      reminder: '',
      collaberators: []
    }

    this.noteColour = "#ffffff";
    this.archive = false;

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

  label(label){
    console.log(this.labels)
    this.labels = label;
    this.labelsId = label.id;
  }

  remove(label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

}
