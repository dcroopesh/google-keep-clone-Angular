import { Component, OnInit, Output, EventEmitter, OnChanges, AfterContentInit, Input, DoCheck } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit{

  hidden = true;
  noteColour="#ffffff";
  dataObject;
  archive = false;
  labels = [];
  removable = true;
  selectable = true;
  labelsIdArray = [];
  remainderDate = '';
  displayDate = '';
  month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
  options: string[] = ['One', 'Two', 'Three'];
  @Output() onNoteCreate = new EventEmitter<string>();

  newNote = false;
  showCollaboratorr = false;
  collaborators = [];
  firstName ;
  lastName ;
  email ;
  textInput = new FormControl('');
  usersDetails;
  pin = false;
  
  constructor(private requests : UserService ,private util : UtilityService) {

    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');

   }
  
  
  ngOnInit(): void {

  }



  ngAfterContentInit(): void{
   
  }

  addCollaborator(){
    //this.collaborators.push()
    //console.log(this.textInput.value)
  }

  showCollaborator(){
    this.showCollaboratorr = ! this.showCollaboratorr;
    this.hideNote();
  }

  hideNote(){
      document.getElementById("container").style.display = "None";
    }
  
  displayNote(){
    this.showCollaboratorr = ! this.showCollaboratorr;
    document.getElementById("container").style.display = "block";
  }

  
  getColor(color){
    this.noteColour = color;
    document.getElementById("container").style.backgroundColor = this.noteColour;
  }


  save(message?){

    let colab = [];
    
    for(let user of this.collaborators){

        colab.push(user)
    }
    
    let labels = []
    for(let label of this.labels){
      let newLabel = label.id 
       labels.push(newLabel)
    }

    this.dataObject =  {

      title       : document.getElementById("title").textContent,
      description : document.getElementById("description").textContent,
      isPined     : this.pin,
      color       : this.noteColour,   
      isArchived  : this.archive,
      labelIdList : JSON.stringify(labels),
      reminder    : this.remainderDate,
      collaberators : JSON.stringify(colab),

    }


    this.noteColour = "#ffffff";
    this.archive = false;
    this.labels = [];
    this.labelsIdArray = [];
    this.remainderDate = '';
    this.collaborators = [];
    this.pin = false;
    

   this.requests.createNotes(this.dataObject) 
    .subscribe((response) =>{
      console.log("Note created")
      this.hidden = !this.hidden;
      this.onNoteCreate.emit("note created");
     
    },
    (error) => {
      console.log("Didn't create a note")
      this.hidden = !this.hidden
    })
  }

  hide(){
    this.hidden = !this.hidden
  }

  Archive(){
    this.archive = true;
    this.save();
  }

  label(labelArray){
    console.log(labelArray)
    this.labels = labelArray
    console.log(labelArray.length )

    }

  remove(label): void {
    const index = this.labels.indexOf(label);
    console.log("del"+label)
    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  checkLabel(labelId){
    for(let i =0 ; i < this.labelsIdArray.length ;i++){
      if(labelId === this.labelsIdArray[i])
      return true;
    }
    return false
  }

  getSelectedDate(date){
    console.log("create",date);
    this.remainderDate = date;
    this.displayDate = ' ' +  this.month[date.getMonth()] + ' ';
    this.displayDate += date.getDate() + ' ';
    var hour = date.getHours() , meridian = "AM"
    if(hour > 12){
      hour -= 12;
      meridian = "PM"
    }

    this.displayDate += hour + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + ' ' + meridian;
    
  }

  removeRemainder(){
    console.log("remove")

    this.remainderDate = '';
  }

  getUserList(){

    let dataObject = {
      searchWord : this.textInput.value 
    }

    this.requests.searchUserList(dataObject)
    .subscribe((response) => {
      this.usersDetails = response.body['data']['details'];
      console.log(this.usersDetails)
    },(error) => {
      console.log("error");
    })

  }

  displayFn(user){

    console.log(JSON.stringify(user))
    this.collaborators.push(user)
}

  removeCollaborator(user){

    
    let index = this.collaborators.indexOf(user)
    this.collaborators.splice(index,1)
  }

  addPin(){
    this.pin = ! this.pin;
  }


}
