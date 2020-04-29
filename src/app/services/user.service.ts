import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UtilityService } from './utility.service';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  
  constructor(private apiRequest : HttpService,private util : UtilityService) {
    
  
  }

  registration(dataObject){

    return this.apiRequest.postRequest(environment.BaseUserURL + 'userSignUp/',dataObject)
    
  }

  login(dataObject){

    return this.apiRequest.postRequest(environment.BaseUserURL + 'login/',dataObject)
    
  }

  forgotPassword(dataObject){
    
    return this.apiRequest.postRequest(environment.BaseUserURL + 'reset/',dataObject)
  }

  resetPassword(dataObject){
    
    const httpOptions = {
    
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem("token"),
        
      }
    
      console.log(this.apiRequest.getEncodData(dataObject))
        
      return this.apiRequest.postRequest(environment.BaseUserURL + 'reset-password/',
      this.apiRequest.getEncodData(dataObject),httpOptions)

  }

  createNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + 'addNotes/',
    this.apiRequest.getEncodData(dataObject),httpOptions)
  }

  getNotes(){
    const httpOptions = {
    
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem("token"),
      
    }
  return this.apiRequest.getRequest(environment.BaseNotesURL + 'getNotesList/',httpOptions)
  }

}

