import { Component, OnInit, DoCheck, AfterViewChecked, AfterContentChecked, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labels-sidenav',
  templateUrl: './labels-sidenav.component.html',
  styleUrls: ['./labels-sidenav.component.scss']
})
export class LabelsSidenavComponent implements OnInit{

  
  noteArray = [];
  labelname;
  notes;
  constructor(private requests : UserService,private route : ActivatedRoute) { 
    
  }

  ngOnInit(): void {

    this.labelname = this.route.snapshot.paramMap.get("labelname")
    this.displayNotes();
    console.log(this.labelname)
    
  }

 
  

  displayNotes(){
    let noteLabel;
    let note = []

    this.requests.getNotesListByLabel(this.labelname)
    .subscribe((response) => {
        this.notes = response.body['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
      
         noteLabel =  this.notes[i]['noteLabels']
         for (var j =0 ; j < noteLabel.length ;j++ ) {  
           if (noteLabel[j]['label'] === this.labelname){
              note.push(this.notes[i]);
           }
        }
      }
      this.noteArray = note;
      
    },
    (error) =>{
      console.error(error);
    })
  }

} 
