import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private http: HttpClient,private snackBarRef:MatSnackBar) {}


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

    this.http.post("http://fundoonotes.incubation.bridgelabz.com/api/user/login",dataObject)
    .subscribe((response) => {
      this.snackBarRef.open("Success",response['data']['message'],{ duration:100})
    },
    
      (error) => {    
        this.snackBarRef.open("login failed",error.error.error.message,{ duration:1000});
      });
  }
}


