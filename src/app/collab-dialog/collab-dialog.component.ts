import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../environments/environment'


@Component({
  selector: 'app-collab-dialog',
  templateUrl: './collab-dialog.component.html',
  styleUrls: ['./collab-dialog.component.scss']
})
export class CollabDialogComponent implements OnInit {

  firstName
  lastName
  email
  collaborators = [];
  textInput = new FormControl('');
  usersDetails;
  showCollaboratorr = true;
  noteId;
  profilePic
  constructor(private requests : UserService,@Inject(MAT_DIALOG_DATA) public data: any ) {

    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.noteId = this.data.item;
    this.collaborators = this.data.collab;
    this.profilePic = environment.BaseURl + localStorage.getItem('userImage');

    console.log(this.collaborators)
   }

  ngOnInit(): void {
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

    console.log(user)
    console.log(JSON.stringify(user))
    this.collaborators.push(user)

    this.requests.AddcollaboratorsNotes(user,this.noteId)
    .subscribe((response) => {
      console.log("Added collaborator")
    },(error) => {
      console.log("Error while adding collaborator")
    })
}

  removeCollaborator(user){

    let index = this.collaborators.indexOf(user)
    this.collaborators.splice(index,1)

    this.requests.removeCollaboratorsNotes(this.noteId,user.userId)
    .subscribe((response) => {
      console.log("removed collaborator")
    }, (error) => {
      console.log("Error while removing collaborator")

    })

  }

}
