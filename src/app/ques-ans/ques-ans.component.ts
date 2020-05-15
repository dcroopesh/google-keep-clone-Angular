import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
//import {FroalaEditor} from 'react-froala-wysiwyg';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap'
import { environment } from '../../environments/environment'
import { MESSAGES_CONTAINER_ID } from '@angular/cdk/a11y';


@Component({
  selector: 'app-ques-ans',
  templateUrl: './ques-ans.component.html',
  styleUrls: ['./ques-ans.component.scss'],
  providers: [NgbRatingConfig] 
})
export class QuesAnsComponent implements OnInit {

  noteId;
  note;
  question = new FormControl();

  firstName
  lastName
  email
  display = true
  datee
  date
  date1
  time1
  time
  showComment = false
  selected = 0;
  hovered = 0;
  readonly = false;
  reply = false
  profilePic
  showReplyComment = false
  commentMessage
  replyMessage
  messageId
  liked = false

  constructor(private route : ActivatedRoute , private requests : UserService,config: NgbRatingConfig) {
    config.max = 5;

    this.noteId = this.route.snapshot.paramMap.get("noteId")

    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.profilePic = environment.BaseURl + localStorage.getItem('userImage');


    this.getNoteData();

   }

  ngOnInit(): void {
    
    
    
  }

  getNoteData(){
    
    this.requests.getNotesDetail(this.noteId)
    .subscribe((response)=>{
      this.note = response['data']['data'][0];
      let ques = this.note['questionAndAnswerNotes']
      console.log(ques)

      if (ques.length > 0){

        this.display = false
        this.commentMessage = ques[0]['message']
        
        // console.log(this.comment)  
        this.showComment = true

        let dateString = ques[0]['createdDate'];
        let date = new Date(dateString)
    
        this.date1 = date.toString().slice(4,16)
        this.time1 = this.formatAMPM(date) 

        this.messageId = ques[0]['id']

        if (ques[0]['rate'].length > 0 ){
          console.log(ques[0]['rate'][0]['rate'])
          this.selected = ques[0]['rate'][0]['rate']
        }

        if (ques[0]['like'].length > 0 ){
          console.log(ques[0]['like'][0]['like'])
          this.liked = ques[0]['like'][0]['like']
        }
      }
        
      
    },(error) =>{
      console.log(error)
    })
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  public options: Object = {
    placeholderText: 'Edit Your Content Here',
    charCounterCount: true,
    
  }


  send(){

    this.commentMessage = this.question.value
    let dataObject = {
    message : this.question.value,
    notesId : this.noteId
  
  }

  

  this.requests.addQuestionAndAnswer(dataObject)
  .subscribe((response) => {
    console.log(response)
    let dateString = response.body['data']['details']['createdDate'];
    let date = new Date(dateString)
    let message = response['data']['details']

    this.messageId = message['id']
    this.date1 = date.toString().slice(4,16)
    this.time1 = this.formatAMPM(date) 

    this.display = ! this.display
    this.showComment = ! this.showComment
    
  },(error) => {
    console.log(error)

  })

}

showReply(){
  // this.question.setValue('')

  this.reply = ! this.reply
}

replyy(){

  console.log(this.question.value)

  this.replyMessage  = this.question.value
  let dataObject = {

    message : this.question.value

  }

  this.requests.replyQuestion(this.messageId,dataObject)
  .subscribe((response)=>{
    let dateString = response.body['data']['details']['createdDate'];
    let date = new Date(dateString)
    
    this.reply = false
    this.showReplyComment = true
    this.date = date.toString().slice(4,16)
    this.time = this.formatAMPM(date)
    
   

  },(error)=>{

  })
}

rating(){

  console.log("rr",this.selected)

  let dataObject = {
    rate : this.selected
  }

  this.requests.rateComment(this.messageId,dataObject)
  .subscribe((response)=>{

  },(errro)=>{

  })
}

like(){
  this.liked = ! this.liked

  let dataObject = {
    like : this.liked
  }

  this.requests.likeComment(this.messageId,dataObject)
  .subscribe((response)=>{

  },(error)=>{

  })
}
  

}
