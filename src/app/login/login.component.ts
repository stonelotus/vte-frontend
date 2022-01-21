import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defaultIfEmpty } from 'rxjs-compat/operator/defaultIfEmpty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  login(email: string,password: string): void {
    this.http.get<any>("http://localhost:3000/login",{params: {email, password}}).subscribe(data => {
      if(data.error) {
        console.log("An error has occured.", data.error);
      } else if(data.response){
        switch(data.response){
          case 'success':
            console.log("Connected successfully. Redirecting..")
            
            break;
          default: console.log('Unkown error'); break;
        }
      }
    }); 
  }

}
