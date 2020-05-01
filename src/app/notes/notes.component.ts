import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes ;
  note = [];
  constructor(private requests : UserService) { }

  ngOnInit(): void {
    
   this.displayNotes();
  
  }

  displayNotes(){
    
    this.note = []
    console.log("123")
    this.requests.getNotes()
    .subscribe((response) => {
      this.notes = response['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
        
      
        if ( ! (this.notes[i]['isDeleted'] || this.notes[i]['isArchived']) ){
         
          this.note.push(this.notes[i]);
        
          }
      }
    },
    (error) =>{
      console.error(error);
    })
  }

  callDisplay(msg){
    console.log("refresh")
    console.log(msg)
    this.displayNotes();
  }

} 
