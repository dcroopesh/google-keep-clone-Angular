import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})

export class ColorComponent implements OnInit {

  displayColor = false;
  @Output() color = new EventEmitter<string>();

  constructor() {  console.log("asdsdasd");
}

  ngOnInit(): void {
  }
  
  display(){
    this.displayColor = ! this.displayColor;
  }

  send(color){
    console.log(color);
    this.display();
    this.color.emit(color);
  }

}
