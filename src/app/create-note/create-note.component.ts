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
  @Output() onNoteCreate = new EventEmitter<string>();

  
  constructor(private requests : UserService ,private util : UtilityService) {

   }
  
  
  ngOnInit(): void {

  }

  ngDoCheck()	
{

}

  ngAfterContentInit(): void{
   
  }
  
  getColor(color){
    this.noteColour = color;
    document.getElementById("container").style.backgroundColor = this.noteColour;
  }


  save(message?){

   this.dataObject =  {
      title: document.getElementById("title").textContent,
      description: document.getElementById("description").textContent,
      isPined: false,
      color: this.noteColour,
      isArchived: this.archive,
      labelIdList: [],
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

  
  
}
