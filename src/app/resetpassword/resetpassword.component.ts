import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  hide = true;
  token;
  constructor(private route: ActivatedRoute,private requests : UserService,private util : UtilityService,private router: Router) { }

  ngOnInit(){
    this.token = this.route.snapshot.paramMap.get("token")
    console.log(this.token);
    localStorage.setItem("token", this.token);
  }

  password = new FormControl('',Validators.required);
  confirmPassword = new FormControl('',Validators.required);


  submit(){
    let dataObject={
    "newPassword": this.password.value,
    
    }
    console.log(this.password.value)

    this.requests.resetPassword(dataObject)
    .subscribe((response) =>{
      console.log(response);
      this.util.snackBar("Success","Password Reset Successful",1000);
      this.router.navigate(['/home']);
    },
    (error) =>{
      console.log(error)
      this.util.snackBar("Failed",error.error.error.message,1000);
    });

     
  }
}
