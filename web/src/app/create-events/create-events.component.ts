import { Component, OnInit, Inject, createPlatformFactory } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MapsService } from '../maps.service';
import {HttpClient }  from '@angular/common/http'
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {
  skills;
  event = {};
  constructor(private map: MapsService, private http: HttpClient,private dialog:MatDialog) {
    this.skills = ['Painting','Teaching','Baking']
  }
  // openDialog(): void {
  //   console.log("Hi");
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '40%',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  
  submit(createForm:NgForm){
    var lat;
    var lng;
    console.log(createForm.form.value);
    var query = createForm.form.value.address.split(" ").join("+").split(",").join("+");
    console.log(query);
    var label = null;
    this.http.get("http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=R1DimVlTjlRWkzJB5USW&app_code=1H17aejP7Qdk36sAOsvMaw&query="+query).subscribe(response =>{
      console.log(response.suggestions[0].label);
      label = response.suggestions[0].label;
      label.split(" ").join("+").split(",").join("+");
      this.http.get('https://geocoder.api.here.com/6.2/geocode.json?app_id=R1DimVlTjlRWkzJB5USW&app_code=1H17aejP7Qdk36sAOsvMaw&searchtext='+label).subscribe(response => {
      console.log(response.Response.View[0].Result[1].Location.DisplayPosition);
      lat = response.Response.View[0].Result[1].Location.DisplayPosition.Latitude;
      lng = response.Response.View[0].Result[1].Location.DisplayPosition.Longitude;
      
      var val = createForm.form.value;
      // console.log('createForm',createForm);
      // var keyNames = Object.keys(createForm.form.value);
      // console.log('Props',keyNames);
      // console.log('skills',createForm.form.value['skills[]']);
      const body = {
          name: val.ename,
          date:val.edate,
          capacity: val.ecap,
          description: val.desc,
          from: val.stime,
          to:val.etime,
          skillsRequired: val['skills[]'],
          location : {
            lat,
            lng
          }
        };
        console.log(body);
        this.http.post('http://192.168.43.169:5000/createEvent', body)
        .subscribe(res => {

        })
        });
        alert("Success");
        window.location = "/dashboard";
    });
    
      
    
  }
  
  ngOnInit() :void{
  }

  lat:string;
  lng: string;
  location : Object;
  
}




