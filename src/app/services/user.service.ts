import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UtilityService } from './utility.service';
import { environment } from '../../environments/environment'
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  BaseUserURL;
  
  constructor(private apiRequest : HttpService,private util : UtilityService) {
    
    this.BaseUserURL = environment.BaseUserURL;
    console.log(environment.BaseUserURL)
    console.log(this.BaseUserURL)
  }

  registration(dataObject){

    return this.apiRequest.postRequest(this.BaseUserURL + 'userSignUp/',dataObject)
    
  }

  login(dataObject){

    return this.apiRequest.postRequest(this.BaseUserURL + 'login/',dataObject)
    
  }

  forgotPassword(dataObject){
    
    return this.apiRequest.postRequest(this.BaseUserURL + 'reset/',dataObject)
  }

  resetPassword(dataObject){
    
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem("token"),
        
    //   })
    // }
        
      return this.apiRequest.postRequest(this.BaseUserURL + 'reset-password/',
      dataObject,{'Authorization': localStorage.getItem("token")})

  }

}

