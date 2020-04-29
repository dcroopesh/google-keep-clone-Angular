import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  hidden = true;
  constructor(private requests : UserService) { }
  dataObject;
  
  ngOnInit(): void {
  }

  save(message){

   this.dataObject =  {
      title: document.getElementById("title").textContent,
      description: document.getElementById("description").textContent,
      isPined: false,
      color: "#FFFFFF",
      isArchived: false,
      labelIdList: [],
      reminder: '',
      collaberators: []
    }
    this.requests.createNotes(this.dataObject)
    .subscribe((response) =>{
      console.log("Note created")
      this.hidden = !this.hidden
    },
    (error) => {
      console.log("Didnt created a note")
      this.hidden = !this.hidden
    })
  }

  hide(){
    this.hidden = !this.hidden
  }
  
}
