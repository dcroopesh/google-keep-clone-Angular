import { Component, OnInit} from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  hide = true;

  constructor(private http: HttpClient,private  snackBarRef : MatSnackBar,private router: Router) {}

  ngOnInit(): void {}

  
  firstname = new FormControl('',[Validators.required,Validators.minLength(4)]);
  lastname = new FormControl('',[Validators.required,Validators.minLength(1)]);
  email = new FormControl('',[Validators.required,Validators.email]);
  password = new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9@$#%]*[@$#%]+[a-zA-Z0-9@$#%]*$')]);
  confirmPassword = new FormControl('',Validators.required);

  errorMessageForFirstName() {
    
    if (this.firstname.errors['required']){
      return "Enter first name"
    }
    else if(this.firstname.errors.minlength)
      return "length should be minimum 4"
    }

   errorMessageForLastName() {
    if (this.lastname.errors.required){
      return "Enter last name"
    }
    else{
      return "length should be minimum 1"
    }
   }


   errorMessageForEmail() {
    if (this.email.errors.required){
      return "Enter an email"
    }
    else { 
    return "Should be valid email"
    }
   }

   errorMessageForPassword(){
    if(this.password.errors.required){
      return "Enter a password"
    }
    else if(this.password.errors.minlength){
      return "Should have minimum length of 8 and a special character @$#%"
    }
    else
      return "Should have one special character @$#%"
    }

    
    checkPasswordEqual(): boolean {
      if (this.password.value === this.confirmPassword.value)  {
          return false;
      }else{
      return true;
      }
    }
    
      submit(){
        let dataObject={"firstName": this.firstname.value,
        "lastName": this.lastname.value,
        "service": "advance",
        "email": this.email.value,
        "password": this.password.value,
        "cartId":"5ea2c96cad53b700227c5df4" 
        }

        this.http.post("http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",dataObject)
        .subscribe((response) => {
          this.snackBarRef.open("Success",response['data']['message'],{ duration:100})
          this.router.navigate(['/login'])
        }
      ,
      (error) => {    
        this.snackBarRef.open("Registration failed",error.error.error.message,{ duration:1000});
      })
    }
    


}
