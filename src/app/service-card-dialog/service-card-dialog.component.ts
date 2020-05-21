import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-card-dialog',
  templateUrl: './service-card-dialog.component.html',
  styleUrls: ['./service-card-dialog.component.scss']
})
export class ServiceCardDialogComponent implements OnInit {

  price
  cartDetails
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ServiceCardDialogComponent>,
  private requests : UserService, private dataService : DataService,private route : Router) { }

  ngOnInit(): void {
    this.price = this.data.price
    this.cartDetails = this.data.cartDetails
  }

  close(){

    let dataObject = {
      productId : ""
    }

    this.requests.addToCart(dataObject)
    .subscribe((response)=>{
    },(error)=>{
      console.log(error)
    })

    

  }

  navigate(){

    this.dataService.sendCartId(this.cartDetails)

    this.dialogRef.close()

    this.route.navigate(['/signup'])

  }

}
