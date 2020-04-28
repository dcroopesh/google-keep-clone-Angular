import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private  snackBarRef : MatSnackBar) { }

  snackBar(message, data, duration = 1000){
    this.snackBarRef.open(message,data,{ duration : duration });
  }
}
