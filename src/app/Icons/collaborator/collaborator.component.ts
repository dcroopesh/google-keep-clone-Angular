import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  @Output() onCollaboratorClick = new EventEmitter();
  show = false;
  firstName ;
  lastName ;
  email ;
  constructor() { 
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');

  }

  ngOnInit(): void {
  }

  showCollaborator(){
    this.show = ! this.show;
    //this.onCollaboratorClick.emit();
  }
}
