import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit ,DoCheck{

  notes ;
  note = [];
  constructor(private requests : UserService) { }

  ngOnInit(): void {
    
   this.displayNotes();
  
  }

  ngDoCheck(){
  }

  displayNotes(){
    
    let notee = [];
    this.requests.getNotes()
    .subscribe((response) => {
      this.notes = response['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
        
        if ( ! (this.notes[i]['isDeleted'] || this.notes[i]['isArchived']) ){
          notee.push(this.notes[i]);
        }
      }
      this.note = notee;
    },
    (error) =>{
      console.error(error);
    })
  }

  

} 
