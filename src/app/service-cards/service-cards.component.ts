import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceCardDialogComponent } from '../service-card-dialog/service-card-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

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
  index
  constructor(private requests : UserService,private dataService : DataService) { }

  ngOnInit(): void {

    this.dataService.getcardIndex
    .subscribe(next =>{
      this.index = next
    } )

    this.requests.getServiceData()
    .subscribe((response)=>{
      
      this.data = response['data']['data']
    
    },(error)=>{
      console.log(error)
    })
  }

  send(i){

    this.dataService.sendCardIndex(i)
    
    this.onClick.emit({index:i,data:this.data});
  }

}
