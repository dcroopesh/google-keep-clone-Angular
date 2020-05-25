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
  leftPosition = "-2%";
  yellowColor1 = "#FFC226";
  yellowColor2 = "black";
  yellowColor3 = "black";

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
    
    this.leftPosition = "44%";
    this.progressBarValue = 50;
    this.yellowColor1 = "black";
    this.yellowColor2 = "#FFC226";
    this.showCheckout = true
  }

  placeOrder(){


    let dataObject = {
      cartId : this.cartDetails['id'],
      address : this.address.value
    }

    this.requests.placeOrder(dataObject)
    .subscribe((response)=>{
      this.leftPosition = "96%";
      this.yellowColor2 = "black";
      this.yellowColor3 = "#FFC226";
      this.progressBarValue = 100;
      this.orderCompleted = ! this.orderCompleted
      
    },(error)=>{

    })

  }

}
