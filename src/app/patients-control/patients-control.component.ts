import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patients-control',
  templateUrl: './patients-control.component.html',
  styleUrls: ['./patients-control.component.scss']
})
export class PatientsControlComponent implements OnInit {
  patientsList: any;
  currentPatientFullData: any;
  showEditPatient: boolean;
  currentEditedPatientID: number;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.patientsList = [];
    this.getPatients();
    this.showEditPatient = false;
  }

  getPatients() {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'patients'}}).subscribe(data => {
      console.log(data.response);
      this.patientsList = data.response;
      this.patientsList.map(patient => {
        patient.created_at = new Date(patient.created_at * 1).toLocaleDateString('en-GB');
        // patient.created_at = timeConverter(patient.created_at);
        return patient;
      })
    });
  };

  deletePatient(patient: any) {
    if(confirm("Are you sure to delete ")) {
      this.http.get<any>("http://localhost:3000/delete",{params: {'resource': 'patient', id: patient.ID}}).subscribe(data => {
        this.getPatients();
      }); 
    }
  }
  editPatientForm(patient: any) {
    let scope = this;
    this.getPatientFullData(patient.ID, function() {
      scope.showEditPatient = true;
      scope.currentEditedPatientID = patient.ID;
    });

  }
  updatePatient(patient: any) { 
    this.http.get<any>("http://localhost:3000/update",{params: {resource: 'patient', patient: JSON.stringify(patient)}}).subscribe(data => {
      this.getPatients();
    });
  }
  getGivenVaccineFullData(patientID:any, callback) {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'given_vaccine', 'level': 'full', id: patientID}}).subscribe(data => {
      console.log(data.response);
      // this.givenVaccines = data.response;
      callback();
    });
  }
  getPatientFullData(patientID: any, callback) {
    let scope = this;
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'patient', 'level': 'full', id: patientID}}).subscribe(data => {
      scope.currentPatientFullData = data.response;
      console.log(data.response);
      callback();
    });
  }
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}