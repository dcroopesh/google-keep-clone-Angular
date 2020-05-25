import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private labelObject = new BehaviorSubject([]);
  private gridList = new BehaviorSubject([]);
  private search = new BehaviorSubject([]);
  private cartId = new BehaviorSubject({id:'',product:{name:''}});
  private cardIndex = new BehaviorSubject(2);

  label = this.labelObject.asObservable();
  gridOrList = this.gridList.asObservable();
  searchText = this.search.asObservable();
  getcartId = this.cartId.asObservable(); 
  getcardIndex = this.cardIndex.asObservable();

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

  sendCardIndex(index){

    this.cardIndex.next(index)

  }


}





 
