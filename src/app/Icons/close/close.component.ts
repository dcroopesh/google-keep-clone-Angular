import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  @Output() onClose = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  send(){
    console.log("closed");
    this.onClose.emit("closed");
  }

}
