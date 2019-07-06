import { Component, OnInit } from '@angular/core';
import {CwfdataService} from '../cwfdata.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  events;
  status;
  activeEvent;
  eventData;
  people;
  stats;

 
  constructor(cwf: CwfdataService) { 
    this.stats = {
      volunteerCount: 120,
      eventCount: 42
    };
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
    },{
      id: 2,
      title: "Book Donation",
      loc: "Madiwala",
      date: new Date(),
      status: "upcoming",
      volunteers: this.people,
    },{
      id: 3,
      title: "Book Donation",
      loc: "Madiwala",
      date: new Date(),
      status: "upcoming",
      volunteers: this.people,
    },{
      id: 4,
      title: "Drawing",
      loc: "Madiwala",
      date: new Date(),
      status: "past",
      volunteers: this.people,
    }]
  })
    
    this.eventData = [
      {
        id: 1, 
        
        status: 'upcoming',
      }
    ]
  
  } //end of constructor


  showEventData(ev){
    this.activeEvent = ev;
  }

  getSVG(s){
    console.log(this.status[s])
    return this.status[s]
  }

  totalVolunteers(){
    return 100
  }
  getUpcomingEvent(){
    return 100
  }
  getRandDate(){
    return 
  }
  ngOnInit() {
    
  }

}
