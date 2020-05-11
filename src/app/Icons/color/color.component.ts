import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})

export class ColorComponent implements OnInit {

  displayColor = false;
  @Output() color = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }
  
  display(){
    this.displayColor = ! this.displayColor;
  }

  send(color){
    this.display();
    this.color.emit(color);
  }

}
