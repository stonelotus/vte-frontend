import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  addPatient(patient: any){ 
    console.log(patient);
    this.http.get<any>("http://localhost:3000/insert",{params: {resource: 'patient', patient: JSON.stringify(patient)}}).subscribe(data => {
      console.log(data);
    });
  }
}
