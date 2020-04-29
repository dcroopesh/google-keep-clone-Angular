import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  notes
  constructor(private requests : UserService) { }

  ngOnInit(): void {
    this.requests.getNotes()
    .subscribe((response) => {
      this.notes = response['data']['data']
      console.log(response['data']['data'][0]);
    },
    (error) =>{
      console.error(error);
    }
    )
  }

}
