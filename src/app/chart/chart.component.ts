import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { domainToUnicode } from 'url';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  noteLength 
  notes = []
  collaboratorNotes = []
  reminder = []
  questionAndAnswer = []
  
  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  
  context
  gap = 30
  height
  width
  y
  i = 0
  labelReminderAndCollab = []
  labelAndReminder = []
  labelAndCollab = []
  collabAndReminder = []
  graph = []
  labelOnly
  remOnly
  collabOnly
  max = 0
  titleOnly
  constructor(private requests : UserService) { }

  ngOnInit(): void {

    let notee = [];
    this.requests.getNotes()
    .subscribe((response) => {
      this.notes = response['data']['data']
      for (var i =0 ; i < this.notes.length ;i++ ){
        
        if ( ! (this.notes[i]['isDeleted'] || this.notes[i]['isArchived']) ){
          notee.push(this.notes[i]);
        }
      }
      this.noteLength = notee.length;
      this.notes = notee;

      this.labelReminderAndCollab = this.notes.filter(note =>{ if(note['collaborators'].length > 0 && note['reminder'].length > 0 && note['noteLabels'].length > 0 ){  return true} })
      console.log(this.notes.length)
      this.labelAndReminder = this.notes.filter(note => { if(note['reminder'].length > 0 && note['noteLabels'].length > 0 && note['collaborators'].length <= 0) { return true} })
      console.log(this.notes.length)

      this.labelAndCollab = this.notes.filter(note => { if(note['collaborators'].length > 0 && note['noteLabels'].length > 0 && note['reminder'].length <= 0) {return true} })
      console.log(this.notes.length)
      this.collabAndReminder = this.notes.filter(note => { if(note['collaborators'].length > 0 && note['noteLabels'].length <= 0 && note['reminder'].length > 0) {return true} })

      this.labelOnly = this.notes.filter(note => { if(note['noteLabels'].length > 0 && note['collaborators'] <= 0 && note['reminder'].length <= 0 ) {  return true} })
      console.log(this.notes.length)

      this.remOnly = this.notes.filter(note => { if(note['reminder'].length > 0 && note['noteLabels'].length <= 0 && note['collaborators'] <= 0) {  return true} })
      console.log(this.notes.length)

      this.collabOnly = this.notes.filter(note => { if(note['collaborators'].length > 0 && note['reminder'].length <= 0 && note['noteLabels'].length <= 0) { return true} })

      this.titleOnly = this.notes.filter(note => { if(note['collaborators'].length <= 0 && note['reminder'].length <= 0 && note['noteLabels'].length <= 0) { return true} })

      
      this.graph.push(this.labelReminderAndCollab)
      this.graph.push(this.labelAndReminder)

      this.graph.push(this.labelAndCollab)
      this.graph.push(this.collabAndReminder)

      this.graph.push(this.labelOnly)
      this.graph.push(this.remOnly)
      this.graph.push(this.collabOnly)
      this.graph.push(this.titleOnly)
      


      
      this.y = (this.height - this.gap * 2 ) / this.maxElement()
      
      this.draw()
      
    },
    (error) =>{
      console.error(error);
    })

    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    
    this.context = this.canvas.nativeElement.getContext('2d')

    this.context.beginPath()
    
    this.context.strokeStyle = 'black';
    this.context.moveTo(this.gap,this.height-this.gap);
    this.context.lineTo(this.width-this.gap,this.height-this.gap);

    this.context.moveTo(this.gap,this.gap);
    this.context.lineTo(this.gap,this.height-this.gap);

    this.context.stroke()
    this.context.fill();
  }

  deleteElement(element){
      let index = this.notes.indexOf(element)
        this.notes.splice(index, 1);
      
  }

  maxElement(){
    for(let i = 0 ; i < this.graph.length; i++){
      console.log(this.graph[i])
      if(this.graph[i].length > this.max){
        this.max = this.graph[i].length
      }
      

      
    }
    console.log(this.max)
    return this.max
  }

  draw(){

    // 1.. label ,reminder and collaborator
    // 2.. label and reminder
    // 3.. label and collab

      let labelName = ['label,rem and colab','label and rem','label and collab','collabAndReminder','labelOnly','remOnly','collabOnly','titleOnly']
    
     

      for(let i = 0 ; i < this.graph.length ; i++){
        

        this.context.fillStyle='#FFB51F';
        this.context.strokeStyle = 'black';
        this.context.font="bold 20pt Calibri"
        this.context.rect(this.gap * (i+1) * 3.5 , this.height-this.gap , 50 ,- (this.graph[i].length * this.y ));
        this.context.fillText(this.graph[i].length,this.gap * (i+1) * 3.5 + 16 , this.height-this.gap - (this.graph[i].length * this.y) - 10)
        
       
      }

      this.context.fill();
      this.context.stroke()

      let text = "Total Notes : "+ this.noteLength
      this.context.fillText( text,this.width - 200, this.gap)


      for(let i = 0 ; i < this.graph.length ; i++){
        this.context.fillStyle='black';
        this.context.font="bold 8pt Calibri"

        this.context.fillText(labelName[i],this.gap * (i+1) * 3.5, this.height-10)
      }

      for(let i = 0 ; i < this.noteLength ; i++){
          this.context.fillText(i,this.gap - 13,this.height - this.gap - i * this.y )

      
    }

   
  }

}
