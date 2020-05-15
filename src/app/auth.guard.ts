import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private requests : UserService,private route : Router){}

  canActivate() : boolean {
    if( this.requests.isloggedIn()){
      return true
    }
    else{
      this.route.navigate(['/login'])
      return false
    }
  }
 
}
