import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { VolunteersComponent } from './volunteers/volunteers.component';

const routes: Routes = [{
    path: "", 
    component: HomeComponent
  }, {
    path: "login",
    component:LoginComponent
  },{
    path: "dashboard",
    component: DashboardComponent
  },{
    path: "reports",
    component: ReportsComponent
  },{
    path: "profile/:id",
    component: ProfileComponent
  },{
    path: "volunteers",
    component: VolunteersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
