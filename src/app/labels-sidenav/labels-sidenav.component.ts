import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labels-sidenav',
  templateUrl: './labels-sidenav.component.html',
  styleUrls: ['./labels-sidenav.component.scss']
})
export class LabelsSidenavComponent implements OnInit {

  constructor(private requests : UserService,private route : ActivatedRoute) { 
    this.labelname = this.route.snapshot.paramMap.get("labelname")
    console.log(this.labelname)
    this.displayNotes();
  }

  noteArray ;
  labelname;
  notes;
  ngOnInit(): void {
   
   

  }


  displayNotes(){
    let noteLabel;
    this.noteArray = []
    this.requests.getNotesListByLabel(this.labelname)
    .subscribe((response) => {
      console.log(response.body['data'])
        this.notes = response.body['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
      
         noteLabel =  this.notes[i]['noteLabels']
         for (var j =0 ; j < noteLabel.length ;j++ ) {  
           if (noteLabel[j]['label'] === this.labelname){
              this.noteArray.push(this.notes[i]);
           }
         }
        }
      
      
    },
    (error) =>{
      console.error(error);
    })
  }

}
