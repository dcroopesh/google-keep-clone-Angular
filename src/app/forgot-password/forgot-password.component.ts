import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar} from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private http: HttpClient,private  snackBarRef : MatSnackBar) { }

  ngOnInit(): void {
  }
  
  email = new FormControl('',Validators.required);

  submit(){
  this.http.post("http://fundoonotes.incubation.bridgelabz.com/api/user/reset",{"email":this.email.value})
  .subscribe((response) => {
    this.snackBarRef.open("",response['message'],{ duration:1000})
  },
  (error) => {    
    this.snackBarRef.open("Failed",error.error.error.message,{ duration:1000});
  });
  }
}

