import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  display = false;
  show = false;
  @Input() noteId;
  @Output() ondelete = new EventEmitter<string>() ;
  @Input() newNote;

  checked = [];

  @Output() onLabelSelect = new EventEmitter<any>() ;

  labels;
  labelArray = [];
  constructor( private requests: UserService , private data : DataService) { 
    
    this.data.label.subscribe(next =>{
      this.labels = next;
      console.log("more")
      console.log(this.labels)
    })

    for(let i=0; i< this.labels.length;i++){
      this.checked.push(false) ;  
    }

   }

  ngOnInit(): void {
  }

  displayLabel(){
    this.display = ! this.display;
    this.show=false;
  
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
  showLabels(){
    this.show= !this.show;
    
  }

  selectLabel(label,i){  
    
    this.checked[i] = ! this.checked[i];
    if(this.checked[i]){
    this.labelArray.push(label) 
    }
    else{
      for(var j=0 ; j < this.labelArray.length;j++){
        if (label == this.labelArray[j])
          this.labelArray.splice(j,1)
      }
    }
    this.onLabelSelect.emit(this.labelArray);
  }
}
