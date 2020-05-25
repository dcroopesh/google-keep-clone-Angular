import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  note = [];
  trash = true
  constructor(private requests : UserService) { }

  ngOnInit(): void {

    this.displayNotes()

  }

  displayNotes(){
    let notee = [];
    this.requests.getTrashNotesList()
    .subscribe((response) => {
      notee = response['data']['data']
      this.note = notee
    },
    (error) =>{
      console.error(error);
    })
  }

}
