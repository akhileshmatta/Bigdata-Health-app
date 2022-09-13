import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostics-login',
  templateUrl: './diagnostics-login.component.html',
  styleUrls: ['./diagnostics-login.component.css']
})
export class DiagnosticsLoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goTodiagnosticdata = () => this.router.navigateByUrl('/diagnostic-data');

}
