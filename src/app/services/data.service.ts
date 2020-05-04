import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private labelObject = new BehaviorSubject([]);
  label = this.labelObject.asObservable();

  constructor() { }

  changeLabel(label) {

    this.labelObject.next(label)

  }


}





 
