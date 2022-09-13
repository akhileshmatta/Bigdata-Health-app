import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-patient-data-retreival',
  templateUrl: './patient-data-retreival.component.html',
  styleUrls: ['./patient-data-retreival.component.css']
})
export class PatientDataRetreivalComponent implements OnInit {

  constructor() { }

  public tabs: any;
  public styles: any;

  ngOnInit(): void {
    this.tabs = [false, true, false];
    this.styles = ['nav-link', 'nav-link active', 'nav-link'];
  } 

  setTab(tab: number) {
    this.tabs = [false, false, false];
    this.styles = ['nav-link', 'nav-link', 'nav-link' ];
    this.tabs[+tab] = true;
    this.styles[+tab] = 'nav-link active'
  }

}
