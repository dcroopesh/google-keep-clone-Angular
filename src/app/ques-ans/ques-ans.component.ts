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
  question = new FormControl("");
  public replyMessage = "asdasd";

  firstName
  lastName
  email
  display = true
  datee

  date = []
  time = []

  showComment = false
  selected = [];
  
  hovered = 0;
  readonly = false;
  reply = []
  profilePic
  showReplyComment = false
  commentMessage = []
  // replyMessage
  messageId = []
  ques = []
  liked = []
  title

  constructor(private route : ActivatedRoute , private requests : UserService,config: NgbRatingConfig) {
    config.max = 5;

    this.noteId = this.route.snapshot.paramMap.get("noteId")

    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.profilePic = environment.BaseURl + localStorage.getItem('userImage');

    // this.selected.fill(0)
    

   }

  ngOnInit(): void {
    
    this.getNoteData();

    
  }

  getNoteData(){

    this.requests.getNotesDetail(this.noteId)
    .subscribe((response)=>{
      this.note = response['data']['data'][0];
      this.title = this.note.title
      this.ques = this.note['questionAndAnswerNotes']

      if (this.ques.length > 0){
        console.log(this.ques.length)
        this.display = false
        this.showComment = true

        for(let i=0;i<this.ques.length;i++){
        
        this.commentMessage[i] = this.ques[i]['message']
        this.reply[i] = false

        let dateString = this.ques[i]['createdDate'];
        let date = new Date(dateString)
    
        this.date[i] = date.toString().slice(4,16)
        this.time[i] = this.formatAMPM(date) 

        this.messageId[i] = this.ques[i]['id']

        if (this.ques[i]['rate'].length > 0 ){
          this.selected[i] = this.ques[i]['rate'][0]['rate']
        }else{
          this.selected[i] = 0
        }

        if (this.ques[i]['like'].length > 0 ){
          this.liked[i] = this.ques[i]['like'][0]['like']
        }
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
    let message = response.body['data']['details']
    
    this.messageId = message['id']
    // this.date1 = date.toString().slice(4,16)
    // this.time1 = this.formatAMPM(date) 

    this.display = ! this.display
    this.showComment = ! this.showComment
    
  },(error) => {
    console.log(error)

  })

}

showReply(i){
  //this.question.setValue('')

  this.reply[i] = ! this.reply[i]
} 

replyy(i){

  console.log(this.replyMessage)

  // this.replyMessage  = this.question.value
  let dataObject = {

    message : this.replyMessage

  }

  this.requests.replyQuestion(this.messageId[i],dataObject)
  .subscribe((response)=>{
    // let dateString = response.body['data']['details']['createdDate'];
    // let date = new Date(dateString)
    
    // this.reply = false
    // this.showReplyComment = true
    // this.date = date.toString().slice(4,16)
    // this.time = this.formatAMPM(date)
    
    this.getNoteData()

  },(error)=>{

  })
}

rating(i){


  let dataObject = {
    rate : this.selected[i]
  }

  this.requests.rateComment(this.messageId[i],dataObject)
  .subscribe((response)=>{

  },(error)=>{

  })
}

like(i){
  this.liked[i] = ! this.liked[i]

  let dataObject = {
    like : this.liked[i]
  }

  this.requests.likeComment(this.messageId[i],dataObject)
  .subscribe((response)=>{

  },(error)=>{

  })
}
  

}
