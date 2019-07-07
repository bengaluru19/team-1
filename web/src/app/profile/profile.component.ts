import { Component, OnInit, Input } from '@angular/core';
import { CwfdataService } from '../cwfdata.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fuse;
  people;
  events;
  query;
  sub;
  name;
  constructor(private cwf:CwfdataService, private router: Router,private route: ActivatedRoute) {     
    console.log(this.route)
    
    
    
  }

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.cwf.getVolunteer()
      this.cwf.getVolunteer(params['id']).subscribe((e)=>{
        console.log(e);
        this.name = e[0].name;
      })

    })
  }

}
