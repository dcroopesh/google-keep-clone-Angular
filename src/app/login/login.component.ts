import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { UtilityService } from '../services/utility.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private requests : UserService,private util : UtilityService) {}


  ngOnInit(): void {
  }

  email = new FormControl('',Validators.required);
  password = new FormControl('',Validators.required);


  submit(){
    let dataObject={
    "email": this.email.value,
    "password": this.password.value,
    "cartId":""
    }

    this.requests.login(dataObject)
    .subscribe((response) =>{
      this.util.snackBar("Success","Login Successful",1000);
    
    },
    (error) =>{
      console.log(error)
      this.util.snackBar("Failed",error.error.error.message,1000);
    });

     
    
      
  }
}


