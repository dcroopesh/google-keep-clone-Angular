import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-remainders',
  templateUrl: './remainders.component.html',
  styleUrls: ['./remainders.component.scss']
})
export class RemaindersComponent implements OnInit {

  notes ;
  note = [];
  constructor(private requests : UserService ) { }

  ngOnInit() : void {
    this.displayNotes();
  }

  displayNotes(){
    
    this.note = []
    let newNote = []
    this.requests.getReminderNotesList()
    .subscribe((response) => {
      this.notes = response['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
        
          newNote.push(this.notes[i]);
        }
      this.note = newNote;
    },
    (error) =>{
      console.error(error);
    })
  }

}
