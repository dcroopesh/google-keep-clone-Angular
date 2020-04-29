import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

 showNotes(){
   this.route.navigate(['/home/note'])
 }
 showRemainders(){
  this.route.navigate(['/home/remainder'])

 }
}
