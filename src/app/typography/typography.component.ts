import { HttpClient } from '@angular/common/http';
import { AbstractType, Component, OnInit } from '@angular/core';
import { Scope } from 'ajv/dist/compile/codegen';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  drugs: any;
  vaccines: any;
  sideEffects: any;
  conditionsArray: any;
  conditionNamesArray: any;
  sideEffectsNamesArray: any;
  constructor(
    private http: HttpClient
  ) { 

  }

  ngOnInit() {
    this.conditionNamesArray = [];
    this.sideEffectsNamesArray = [];
    this.getDrugs();
    this.getVaccines();
    this.getSideEffects();
    this.getConditions();
  }
  getDrugs(): void {
    let scope = this;
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'drugs'}}).subscribe(data => {
     this.drugs = data.response; 
     console.log(data);
    });
  }
  getVaccines(): void {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'vaccines'}}).subscribe(data => {
     this.vaccines = data.response; 
     console.log(this.vaccines);
    });
  }
  getSideEffects(): void {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'side_effects'}}).subscribe(data => {
     this.sideEffects = data.response; 
     console.log(this.sideEffects);
     let scope = this;
     this.sideEffects.forEach(function(sideEffect) {
      scope.sideEffectsNamesArray.push(sideEffect.name);
    });
    });
  }
  getConditions(): void {
    this.http.get<any>("http://localhost:3000/get",{params: {'resource': 'conditions'}}).subscribe(data => {
     this.conditionsArray = data.response; 
     console.log("conditions:",this.conditionsArray);
     let scope = this;
     this.conditionsArray.forEach(function(condition) {
       scope.conditionNamesArray.push(condition.name);
     });
    });
  }
  addDrug(drug: any): void {
    console.log("drug");
    console.log(drug);

    if(this.sideEffectsNamesArray.includes(drug.side_effect_fix) == false) {
      console.log("Wrong side effect. Check list on right of form");
      return;
    }
    if(this.conditionNamesArray.includes(drug.prohibited_condition) == false) {
      console.log("Wrong condition fixed. Check list on right of form");
      return;
    }

    this.http.get<any>("http://localhost:3000/insert",{params: {resource: 'drug', drug: JSON.stringify(drug)}}).subscribe(data => {
      console.log(data);
      this.getDrugs();
    });
  }
  deleteDrug(drugId: any): void {
    console.log("Clicked delete");
    if(confirm("Are you sure to delete ")) {
      this.http.get<any>("http://localhost:3000/delete",{params: {'resource': 'drug', 'id': drugId}}).subscribe(data => {
      
      });
    }
  }
}
