import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { domainToUnicode } from 'url';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  note 
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
      console.log(notee)

      this.collaboratorNotes = notee.filter(note =>{ if(note['collaborators'].length > 0)  return true })
      this.reminder = notee.filter(note => { if(note['reminder'].length > 0) return true })
      console.log(this.collaboratorNotes)
      this.notes = notee;

      this.note = notee.length;
      this.y = (this.height - this.gap * 2 ) / this.note
      
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


  draw(){

    


    this.context.fillStyle='#FFB51F';
    this.context.strokeStyle = 'black'
    

      this.context.rect(this.gap * 3 , this.height-this.gap,50,- (this.collaboratorNotes.length * this.y ));
      this.context.font="bold 20pt Calibri"
      this.context.fillText(this.collaboratorNotes.length,this.gap*3 + 18, this.height-this.gap-this.collaboratorNotes.length * this.y  -  10)
      
      this.context.rect(this.gap * 6, this.height-this.gap,50,- (this.reminder.length * this.y ));
      this.context.font="bold 20pt Calibri"
      this.context.fillText(this.reminder.length,this.gap * 6 + 18, this.height-this.gap-this.reminder.length * this.y  -  10)
      
      this.context.fill();
      this.context.stroke()
      
    
    




  }

  
    

    



 
  



}
