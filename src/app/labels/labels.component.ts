import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  labels = []

  constructor(public dialogRef: MatDialogRef<LabelsComponent>,@Inject(MAT_DIALOG_DATA) public label: any,
  private requests : UserService) {
    console.log("labelcons")
    this.labels = this.label.label;
   }

  inputLabelText; 
  onLabel = []
  ngOnInit(): void {
  }

  clearText(){
    this.inputLabelText = '';
  }

  addLabel(){
    this.labels.push({ label:this.inputLabelText });

    let dataObject = {
      label : this.inputLabelText,
      isDeleted: false,
      userId : localStorage.getItem('userId')
    }
    this.requests.noteLabels(dataObject)
    .subscribe(
      (response) => {
        console.log('label added')
      },
      (error) => {
        console.log('error in adding label')
      }
    )
    this.onLabel.push(false);
    this.clearText();
  }

  showDelete(index){
    this.onLabel[index] = true;
  }
  
  hideDelete(index){
    this.onLabel[index] = false;
  }

  deleteLabel(label,index){

    this.requests.deleteNoteLabel(label.id)
    
    .subscribe((response)=> {
      console.log("label deleted succesfully")
      console.log(this.labels)
      this.labels.splice(index,1);
    },
    (error)=>{
      console.log("note able to delete a label")

    })
  }

}
``