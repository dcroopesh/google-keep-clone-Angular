import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { UserService } from '../services/user.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  router: any;

  constructor(private requests : UserService,private util : UtilityService) { }

  ngOnInit(): void {
  }
  
  email = new FormControl('',Validators.required);

  submit(){
   this.requests.forgotPassword( {"email": this.email.value})
   .subscribe((response) =>{
    
    this.util.snackBar("Success",response.body['message'],1000);
    
  
  },
  (error) =>{
    console.log(error.error)
    
    this.util.snackBar("Failed",error.error.error.message,1000);
  });
  }
  
}

