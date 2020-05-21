import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { UtilityService } from '../services/utility.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cartId
  hide = true;
  constructor(private requests : UserService,private util : UtilityService,
    private router : Router,private data:DataService) {}


  ngOnInit(): void {

    this.data.getcartId.subscribe(next => 
      {
      this.cartId = next 
      console.log(this.cartId)
      })
  }

  email = new FormControl('',Validators.required);
  password = new FormControl('',Validators.required);


  submit(){
    let dataObject={

      email    : this.email.value,
      password : this.password.value,
      cartId   : ""
      
    }

    this.requests.login(dataObject)
    .subscribe((response) =>{
      localStorage.setItem("token",response.body['id'])
      localStorage.setItem("userId",response.body['userId'])
      localStorage.setItem("firstName",response.body['firstName'])
      localStorage.setItem("lastName",response.body['lastName'])
      localStorage.setItem("email",response.body['email'])
      localStorage.setItem("userImage",response.body['imageUrl'])

      this.util.snackBar("Success","Login Successful",1000);
      this.router.navigate(['/home']);
    
    },
    (error) =>{
      console.log(error)
      this.util.snackBar("Failed",error.error.error.message,1000);
    });

     
    
      
  }
}


