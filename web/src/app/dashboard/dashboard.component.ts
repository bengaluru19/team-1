import { Component, OnInit } from '@angular/core';
import {CwfdataService} from '../cwfdata.service'
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
  approvedList;
  animClass;
  eventsList;
  vols;
  constructor(private cwf: CwfdataService, private http: HttpClient) { 
    this.stats = {
      volunteerCount: 120,
      eventCount: 42
    };
    this.approvedList = true;

    this.eventsList =  this.http.post(cwf.domain + "/getEvents", {}).subscribe((s)=>{
      this.eventsList = s;
      this.eventsList.forEach((element, i) => {
        this.cwf.getEventPeople(element._id).subscribe((d)=>{
          console.log(d, i);
          this.eventsList[i].volunteers = d; 
        })
      });
    })

    this.vols = cwf.getAllVolunteers().subscribe((r)=>{
      this.vols = r;
    })
      

    
    this.eventData = [
      {
        id: 1, 
        
        status: 'upcoming',
      }
    ]
  
  } //end of constructor

  getAllEvents(){
    return this.cwf.getEvents();
  }
  showEventData(ev){
    this.activeEvent = ev;
  }
  showApproved(state){
    this.approvedList = state;
  }

  getSVG(s){
    console.log(this.status[s])
    return this.status[s]
  }
  getToggleClass(t){
    this.animClass = "on"
    let a = this;
    
    return this.animClass;
  }

  isComplete(ev){
    return ev.capacity == ev.volunteers.length;
  }

  approveVolunteer(i, vid, eid){
    this.cwf.approveVol(vid, eid);
  }
  rejectVolunteer(i, vid, eid){
    this.activeEvent = this.activeEvent.slice(i);
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
