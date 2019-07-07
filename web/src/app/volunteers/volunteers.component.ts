import { Component, OnInit, Input } from '@angular/core';
import Fuse from 'fuse.js';
import { CwfdataService } from '../cwfdata.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  fuse;
  people;
  events;
  query;
  sub;
  constructor(cwf:CwfdataService, private router: Router,private route: ActivatedRoute) { 
    this.query = ""
    this.sub = this.route.params.subscribe(params => {
      console.log(params)
    })
    const options: Fuse.FuseOptions = {
      keys: ['name'],
    };
    
    cwf.getAllVolunteers().subscribe((d)=>{
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
  
      this.fuse = new Fuse(this.people, options)
    })
    
   
    
  }
  search(){
    return  this.fuse.search(this.query.length==''?" ": this.query)
  }
  ngOnInit() {

  }


}
