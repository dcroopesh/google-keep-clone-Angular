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

  isloggedIn(){
    return !! localStorage.getItem('token');
  }

  logout(){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseUserURL + 'logout/',{},httpOptions)

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

  updateNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseNotesURL + 'updateNotes/',dataObject,httpOptions)
    
  }

  getNotesDetail(noteId){
    const httpOptions = {
    
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.getRequest(environment.BaseNotesURL + 'getNotesDetail/' + noteId ,httpOptions)


  }

  deleteNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + 'trashNotes',dataObject,httpOptions);
  }

  getArchiveNotesList(){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.getRequest(environment.BaseNotesURL + 'getArchiveNotesList/',httpOptions)

  }


    unArchiveNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + 'archiveNotes/',dataObject,httpOptions);
  }

  getNoteLabelList(){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.getRequest(environment.BaseLabelURl + 'getNoteLabelList/',httpOptions)

  }

  noteLabels(dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseLabelURl,dataObject,httpOptions);

  
  }

  deleteNoteLabel(labelID){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.deleteRequest('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/' + labelID + '/deleteNoteLabel',httpOptions)
    
  }


  getNotesListByLabel(labelname){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseNotesURL+ 'getNotesListByLabel/' + labelname,{},httpOptions);


  }

  searchUserList(dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseUserURL + 'searchUserList/',dataObject,httpOptions)
  }


  changesColorNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL+ 'changesColorNotes/',dataObject,httpOptions)
  }

  archiveNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL+ 'archiveNotes/',dataObject,httpOptions)
  }
  
  addUpdateReminderNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + 'addUpdateReminderNotes/',dataObject,httpOptions)
  }



  add(labelId,noteId){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + noteId + '/' + 'addLabelToNotes/' + labelId + '/add',{},httpOptions)

  }

  remove(labelId,noteId){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + noteId + '/' + 'addLabelToNotes/' + labelId + '/remove',{},httpOptions)

  }

  removeReminderNotes(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + 'removeReminderNotes/',dataObject,httpOptions)

  }

  getReminderNotesList(){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.getRequest(environment.BaseNotesURL + "getReminderNotesList/",httpOptions)

  }

  AddcollaboratorsNotes(dataObject,noteId){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseNotesURL + '/' + noteId + '/AddcollaboratorsNotes',dataObject,httpOptions)
  }

  removeCollaboratorsNotes(noteId,colabUserId){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.deleteRequest(environment.BaseNotesURL + '/' + noteId + '/removeCollaboratorsNotes/' + colabUserId,httpOptions)

  }

  addQuestionAndAnswer(dataObject){
    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseQAURl + 'addQuestionAndAnswer/',dataObject,httpOptions)

  }


  replyQuestion(messageId,dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseQAURl + 'reply/' + messageId,dataObject,httpOptions)


  }

  rateComment(messageId,dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseQAURl + 'rate/' + messageId,dataObject,httpOptions)

  }


  likeComment(messageId,dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }
    return this.apiRequest.postRequest(environment.BaseQAURl + 'like/' + messageId,dataObject,httpOptions)

  }

  uploadProfileImage(data){

    const httpOptions = {
    
      'Content-Type': 'multipart/form-data',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseUserURL + 'uploadProfileImage',data,httpOptions)


  }

  getServiceData(){

    const httpOptions = {
    
      'Content-Type': 'application/json'
    }

    return this.apiRequest.getRequest(environment.BaseUserURL+ "service/",httpOptions)

  }

  addToCart(dataObject){

    return this.apiRequest.postRequest(environment.BaseCartURl + "addToCart",dataObject)

  }

  getCartDetails(){
    const httpOptions = {
    
      'Content-Type': 'application/json'
    }

    return this.apiRequest.getRequest(environment.BaseCartURl + "getCartDetails/",httpOptions)

  }

  myCart(){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.getRequest(environment.BaseCartURl + "myCart/",httpOptions)


  }


  placeOrder(dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseCartURl + "placeOrder/",dataObject,httpOptions)

  }

  getTrashNotesList(){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.getRequest(environment.BaseNotesURL + 'getTrashNotesList/',httpOptions)

  }

  deleteForeverNotes(dataObject){

    const httpOptions = {
    
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
      
    }

    return this.apiRequest.postRequest(environment.BaseNotesURL + "deleteForeverNotes/",dataObject,httpOptions)


  }

}

