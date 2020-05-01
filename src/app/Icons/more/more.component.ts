import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  display = false;
  @Input() noteId;
  @Output() ondelete = new EventEmitter<string>() ;
  
  constructor( private requests: UserService ) { }
  

  ngOnInit(): void {
  }

  displayLabel(){
    this.display = ! this.display;
  }

  deleteNote(){
    
    console.log(this.noteId);
    
    let dataObject = {
      isDeleted : true,
      noteIdList : [this.noteId]
    }
    
    this.requests.deleteNotes(dataObject).subscribe(
      (response) =>{
        console.log(response);
        this.displayLabel();
        this.ondelete.emit("note deleted");

      },
      (error) =>{
        console.log(error);

      })

  }
}
