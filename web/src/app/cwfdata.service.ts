import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CwfdataService {
  people;
  domain;
  eventDetails;
  joinedData
  constructor(private http: HttpClient) {
    // this.people =  this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res)=>{      
    //   this.setData(res)
    // });

    
    
    this.domain = "http://192.168.43.169:5000";

    this.eventDetails =  this.http.post(this.domain + "/getEvents", {}).subscribe((e)=>{
      this.eventDetails = e;
    })


    // this.getEvents().subscribe( (res)=>{
    //   res.forEach((thisEvent, i) => {
    //     this.getEventPeople(thisEvent).subscribe((resx)=>{
          
    //       res[i].volunteers = (resx.length)>0?resx:[];
    //     })
    //     this.setAllData(res)
    //     // console.log(res)
    //   });

    // })
  }
  setAllData(res){
    this.joinedData = res;
  }
  getJoinedData(){
    return this.joinedData
  }
  setData(data){
    this.people = data;
  };
  setEvents(d){
    this.eventDetails = d;
  }
  getPeople(){
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }
  setPeople(p){
    this.people = p;
  }



  getEventPeople(eid){
    return this.http.post(this.domain + "/getVolunteersForEvent", {eventId: eid})
  }


  getEvents(){    
    
    return this.http.post(this.domain + "/getEvents", {})
  }

  getAllVolunteers(){
    return this.http.post(this.domain + "/getVolunteers", {})
    // .subscribe((res)=>{
      
    // })
  }

  getVolunteer(vid){
    return this.http.post(this.domain + "/getVolunteerDetails", {_id: vid})
  }

  approveVol(eid, vid){
    return this.http.post(this.domain + "/adminAcceptEvent", {eventId: eid, volunteerId: vid}).subscribe((res)=>{
      console.log(res)
    })
  }

  getMongod(){
    // return this.http.post("http://localhost:5000/")
  }
}
