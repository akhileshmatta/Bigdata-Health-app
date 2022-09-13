import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor() { } 

  public tabs: any;
  public styles: any; 

  ngOnInit(): void {
    this.tabs = [true, false, false, false,false,false,false,false];
    this.styles = ['nav-link active', 'nav-link', 'nav-link', 'nav-link','nav-link','nav-link','nav-link','nav-link'];
  }

  setTab(tab: number) {
    this.tabs = [false, false, false, false,false,false,false,false];
    this.styles = ['nav-link', 'nav-link', 'nav-link', 'nav-link','nav-link','nav-link','nav-link','nav-link'];
    this.tabs[+tab] = true;
    this.styles[+tab] = 'nav-link active'
  }

}
