import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(private http: HttpClient) { }

  postRequest( requestAPI : string, dataObject,httpOptions?){
  
    return this.http.post(requestAPI,dataObject,{ headers : httpOptions , observe:'response'})

  }

  getRequest( requestAPI : string ,httpOptions){
    return this.http.get(requestAPI,{headers : httpOptions})
  }

  getEncodData(toConvert) { 
    const formBody = []; 
    for (const property in toConvert) { 
      const encodedKey = encodeURIComponent(property); 
      const encodedValue = encodeURIComponent(toConvert[property]); 
      formBody.push(encodedKey + '=' + encodedValue); 
    } 
    return formBody.join('&'); }
}
