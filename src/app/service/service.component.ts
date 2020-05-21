import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCardDialogComponent } from '../service-card-dialog/service-card-dialog.component';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  price
  cartId = ""
  data
  index
  cartDetails
  constructor(private requests : UserService,public dialog: MatDialog) { }


  ngOnInit(): void {}

  selected(data){

    this.data = data.data 
    this.index = data.index
    let dataObject = {
      productId : this.data[this.index]['id']
    }

    this.requests.addToCart(dataObject)
    .subscribe((response)=>{
      console.log(response)
      this.cartId = response.body['data']['details']['id']
      this.cartDetails = response.body['data']['details']
      this.dialog.open(ServiceCardDialogComponent, {
        width : '550px',
        data  : { price : this.data[this.index]['price'],cartDetails : this.cartDetails },
        panelClass : 'mat-no-padding-dialog',
        });

    },(error)=>{
      console.log(error)
    })


  }

  

  
  


}
