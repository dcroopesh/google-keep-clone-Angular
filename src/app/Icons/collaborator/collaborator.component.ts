import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  @Output() onCollaboratorClick = new EventEmitter();
  
  constructor() { 
    

  }

  ngOnInit(): void {
  }

  showCollaborator(){
    this.onCollaboratorClick.emit();
  }
}
