import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-data',
  templateUrl: './diagnostic-data.component.html',
  styleUrls: ['./diagnostic-data.component.css']
})
export class DiagnosticDataComponent implements OnInit {

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
