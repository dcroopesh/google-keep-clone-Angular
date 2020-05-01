import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-unarchive',
  templateUrl: './unarchive.component.html',
  styleUrls: ['./unarchive.component.scss']
})
export class UnarchiveComponent implements OnInit {

  @Input() noteId;
  @Output() onUnArchive = new EventEmitter<string>();
  constructor(private requests : UserService) { }

  ngOnInit(): void {
  }

  unArchive(){
    
    console.log("unarc"+this.noteId);
    
    let dataObject = {
      isArchived : false,
      noteIdList : [this.noteId]
    }
    console.log(dataObject)
    this.requests.unArchiveNotes(dataObject)
    .subscribe(
      (response) =>{
        console.log(response);
        this.onUnArchive.emit();
      },
      (error) =>{
        console.log(error);

      })
    }
}
