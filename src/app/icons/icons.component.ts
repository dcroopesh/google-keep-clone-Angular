import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Output() onClose = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  send(){
    console.log("closed")
    this.onClose.emit("closed");
  }

 
}
