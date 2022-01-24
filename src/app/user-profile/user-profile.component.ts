import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  availableConditions: any;
  showAvailableConditions: boolean;
  constructor(
    private http: HttpClient
  ) { 
  }

  ngOnInit(): void  {
    this.availableConditions = [];
    this.showAvailableConditions = false;
    this.getAvailableConditions();
  }

  addPatient(patient: any){ 
    console.log(patient);
    this.http.get<any>("http://localhost:3000/insert",{params: {resource: 'patient', patient: JSON.stringify(patient)}}).subscribe(data => {
      console.log(data);
    });
  }
  getAvailableConditions() {
    let scope = this;
    this.http.get<any>("http://localhost:3000/get",{params: {resource: 'conditions'}}).subscribe(data => {
      scope.availableConditions = data.response;
      console.log(scope.availableConditions);
      scope.showAvailableConditions = true;

    }); 
  }
}
