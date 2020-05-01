import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-archive-sidenav',
  templateUrl: './archive-sidenav.component.html',
  styleUrls: ['./archive-sidenav.component.scss']
})
export class ArchiveSidenavComponent implements OnInit {

  note = [];
  notes;
  constructor(private requests:UserService) { 
  this.displayNotes();
  }

  ngOnInit(): void {
  }

  displayNotes(){
    
    this.note = []
    this.requests.getArchiveNotesList()
    .subscribe((response) => {
      this.notes = response['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
      
        if (this.notes[i]['isArchived'] && ! this.notes[i]['isDeleted']) {
            this.note.push(this.notes[i]);
          }
      }
      
    },
    (error) =>{
      console.error(error);
    })
  }
}
