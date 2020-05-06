import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  display = false;
  time = {hour: new Date().getHours(), minute: new Date().getMinutes()};
  meridian = true;
  calender = false;
  date = new FormControl(new Date());
  selectedDate = new Date;
  Date = new Date;

  constructor() { }
  @Output() OnDateSelect = new EventEmitter<Date>();

  ngOnInit(): void {
  }

  showremainder(){
    this.calender = false;
    this.display = ! this.display;
  }

 

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  displayCalender(){
    
    this.calender = ! this.calender;
    

  }

  myFilter = (d: Date | null): boolean => {
    
    const currentDate = new Date();
    return  d.getDate() >= currentDate.getDate();
  }

  sendData(){
    
    this.selectedDate= this.date.value;
    this.selectedDate.setHours(this.time.hour);
    this.selectedDate.setMinutes(this.time.minute);
    console.log(this.selectedDate)
    this.send();

  }

  sendToday(){
    this.selectedDate.setDate(this.Date.getDate());
    this.selectedDate.setHours(20);
    this.selectedDate.setMinutes(0);
    this.send();
    }

  sendTomo(){
    
    this.selectedDate.setDate(this.Date.getDate() + 1);
    this.selectedDate.setHours(8);
    this.selectedDate.setMinutes(0);
    this.send();

  }

  sendNextWeek(){
    this.selectedDate.setDate(this.Date.getDate() + 7);
    this.selectedDate.setHours(8);
    this.selectedDate.setMinutes(0);
    this.send();

  }

  send(){
    this.OnDateSelect.emit(this.selectedDate);
    this.showremainder();
  }
}

