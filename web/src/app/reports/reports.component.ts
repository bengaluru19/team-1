import { Component, OnInit } from '@angular/core';
import { CwfdataService } from '../cwfdata.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  events;
  status;
  activeEvent;
  eventData;
  people;
  stats;
  approvedList;
 
  constructor(cwf: CwfdataService) { 
    this.stats = {
      volunteerCount: 120,
      eventCount: 42
    };
    this.activeEvent = true;
    this.approvedList = true;
    cwf.getPeople().subscribe((d)=>{
      this.people = d;
      this.people.forEach(element => {
        
        element.date = new Date(new Date().getTime() - (Math.random()*9009090))
      });
    
    this.events = [{
      id: 1,
      title: "Book Donation",
      loc: "Madiwala",
      date: new Date(),
      status: "upcoming",
      volunteers: this.people,
      maxVol: 40
    },{
      id: 2,
      title: "Teaching",
      loc: "Madiwala",
      date: new Date(),
      status: "upcoming",
      volunteers: this.people,
      maxVol: 40
    },{
      id: 3,
      title: "Painting",
      loc: "Madiwala",
      date: new Date(),
      status: "upcoming",
      volunteers: this.people,
      maxVol: 40
    },{
      id: 4,
      title: "Drawing",
      loc: "Madiwala",
      date: new Date(),
      status: "past",
      volunteers: this.people,
      maxVol: 40
    }]
  })
    
    this.eventData = [
      {
        id: 1, 
        
        status: 'upcoming',
      }
    ]
  
  } //end of constructor

  byEvent(s){
    this.activeEvent = s;
  }

  getRandomTime(hr){
    console.log(Math)
    return Math.random()>0.5? (hr+1): Math.floor(Math.random()*60)
  }
  ngOnInit() {
  }
  

}
