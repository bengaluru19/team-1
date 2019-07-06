import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CwfdataService {
  people;
  constructor(private http: HttpClient) {
    this.people =  this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res)=>{      
      this.setData(res)
    });
  }
  setData(data){
    this.people = data;
  };
  getPeople(){
    return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      retry(1)
    );
  }

  getMongod(){
    // return this.http.post("http://localhost:5000/")
  }
}
