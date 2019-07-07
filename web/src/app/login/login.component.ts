import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = {};
  constructor(private http:HttpClient, private global: GlobalsService) { 
    global.setInvalid();
  }

invalid = 0;

  ngOnInit() {
  }
  submit(loginForm : NgForm){
    const body = {
      email: loginForm.form.value.email,
      password: loginForm.form.value.password
    }
    console.log(body);
    this.http.post('http://192.168.43.169:5000/authenticateAdmin', body).subscribe(res => {
            console.log(res);
            if(res === '0'){
              this.invalid = 1;
            }else{
              this.global.unsetInvalid();
              window.location="/dashboard";
            }
      });
    }
  }

