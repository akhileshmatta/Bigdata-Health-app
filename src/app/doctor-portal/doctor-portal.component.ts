import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-portal',
  templateUrl: './doctor-portal.component.html',
  styleUrls: ['./doctor-portal.component.css']
})
export class DoctorPortalComponent implements OnInit {

  constructor() { }

  public tabs: any;
  public styles: any;

  ngOnInit(): void {
    this.tabs = [true, false];
    this.styles = ['nav-link active', 'nav-link'];
  }

  setTab(tab: number) {
    this.tabs = [false, false];
    this.styles = ['nav-link', 'nav-link'];
    this.tabs[+tab] = true;
    this.styles[+tab] = 'nav-link active'
  }

}
