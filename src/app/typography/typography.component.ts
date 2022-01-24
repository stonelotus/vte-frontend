import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  drugs: any;
  vaccines: any;
  constructor(
    private http: HttpClient
  ) { 

  }

  ngOnInit() {
    this.getDrugs();
    this.getVaccines();
  }
  getDrugs(): void {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'drugs'}}).subscribe(data => {
     this.drugs = data.response; 
    });
  }
  getVaccines(): void {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'vaccines'}}).subscribe(data => {
     this.vaccines = data.response; 
     console.log(this.vaccines);
    });
  }
}
