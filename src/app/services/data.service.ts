import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private labelObject = new BehaviorSubject([]);
  private gridList = new BehaviorSubject([]);
  private search = new BehaviorSubject([]);
  private cartId = new BehaviorSubject([]);


  label = this.labelObject.asObservable();
  gridOrList = this.gridList.asObservable();
  searchText = this.search.asObservable();
  getcartId = this.cartId.asObservable(); 

  constructor() { }

  changeLabel(label) {

    this.labelObject.next(label)

  }

  changeView(listView){
    this.gridList.next(listView)
  }

  searchNote(text){

    this.search.next(text)

  }

  sendCartId(id){

    this.cartId.next(id);

  }


}





 
