import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartDetails;
  productDetails;
  progressBarValue = 0;
  showCheckout = false;
  orderCompleted = false;
  address = new FormControl()
  constructor(private requests : UserService ,private util : UtilityService) { }

  ngOnInit(): void {
    this.requests.myCart()
    .subscribe((response)=>{
        let length = response['data'].length
        console.log(length)
        this.cartDetails = response['data'][length-1] 
        this.productDetails = this.cartDetails['product']
      },(error)=>{
      console.log(error)
    })

  }

  checkout(){
    this.progressBarValue = 50;
    this.showCheckout = true
  }

  placeOrder(){


    let dataObject = {
      cartId : this.cartDetails['id'],
      address : this.address.value
    }

    this.requests.placeOrder(dataObject)
    .subscribe((response)=>{
      this.progressBarValue = 100;
      this.orderCompleted = ! this.orderCompleted
      
    },(error)=>{

    })

  }

}
