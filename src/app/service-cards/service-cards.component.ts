import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceCardDialogComponent } from '../service-card-dialog/service-card-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss']
})
export class ServiceCardsComponent implements OnInit {

  @Output() dataArray = new EventEmitter();
  @Output() onClick = new EventEmitter<object>();
  @Input() cartId;
  colour = "#FFC226"
  data;
  index = 2
  constructor(private requests : UserService) { }

  ngOnInit(): void {

    this.requests.getServiceData()
    .subscribe((response)=>{
      
      this.data = response['data']['data']
    
    },(error)=>{
      console.log(error)
    })
  }

  send(i){
    this.onClick.emit({index:i,data:this.data});
  }

}
