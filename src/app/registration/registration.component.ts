import { Component, OnInit} from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { UtilityService } from '../services/utility.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  hide = true;

  constructor(private router: Router , private requests : UserService,private util : UtilityService) {
    
  }

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

       
        this.requests.registration(dataObject)
        .subscribe((response) =>{
          this.util.snackBar("Success","Login Successful",1000);
          this.router.navigate(['/login']);
        
        },
        (error) =>{
          console.log(error)
          this.util.snackBar("Failed",error.error.error.message,1000);
        });
          
        
        
    }
  }
    