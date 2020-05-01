import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  @Output() onArchive = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  send(){
    console.log("closed");
    this.onArchive.emit();
  }

}
