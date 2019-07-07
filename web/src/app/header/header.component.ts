import { Component, OnInit, ViewChild } from '@angular/core';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  invalid = GlobalsService.invalid;
  allMenus;
  constructor(private global:GlobalsService) {
    
    this.allMenus = [{
      text: "Home",
      route: ""
    }, {
      text: "Dashboard",
      route: "/dashboard"
    }]
  }


}