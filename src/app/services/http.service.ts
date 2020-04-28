import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(private http: HttpClient) { }

  postRequest( requestAPI : string, dataObject,httpOptions?){
  
    return this.http.post(requestAPI,dataObject,{headers : httpOptions , observe:'response'})

  }
}
