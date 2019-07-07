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
  totalVols
  constructor(private cwf: CwfdataService, private http: HttpClient) { 
    this.stats = {
      volunteerCount: 120,
      eventCount: 42
    };
    this.approvedList = true;

    this.eventsList =  this.http.post(cwf.domain + "/getEvents", {}).subscribe((s)=>{
      this.eventsList = s.reverse();
      this.eventsList.forEach((element, i) => {
        this.cwf.getEventPeople(element._id).subscribe((d)=>{
          console.log(d, i);
          this.eventsList[i].volunteers = d; 
        })
      });
    })

    this.vols = cwf.getAllVolunteers().subscribe((r)=>{
      this.vols = r;
      this.totalVols = r.length;
    })
      
    
    this.eventData = [
      {
        id: 1, 
        
        status: 'upcoming',
      }
    ]
  
  } //end of constructor
  getCountX(){
    let count = 0;
    this.eventsList.forEach(el => {
      if(!el.capacity>=1){
        count++
      }
    });
    return count;
  }
  
  getAllEvents(){
    return this.cwf.getEvents();
  }
  showEventData(ev){
    this.activeEvent = ev;
    let x = {};    
      this.vols.forEach(el => {
        x[el._id] = el;
      });
      this.vols = x;      
      
    // this.activeEvent.volunteers = this.cwf.getEventPeople(this.activeEvent._id).subscribe((r)=>{
    //   this.activeEvent.volunteers = r
    //   console.log(r)
    // })
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

  isCompleted(ev){
    return ev.capacity >= 1;
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
