import { Component, OnInit, ViewChild } from '@angular/core';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isLoggedIn;
  allMenus;
  constructor() {
    this.isLoggedIn = true;
    this.allMenus = [{
      text: "Home",
      route: ""
    }, {
      text: "Dashboard",
      route: "/dashboard"
    },{
      text: "Volunteers",
      route: "/volunteers"
    }]
  }


}