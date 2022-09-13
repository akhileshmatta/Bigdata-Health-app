import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css']
})
export class DiagnosticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
opensweetalert() {
  Swal.fire('Submitted Successfully', "Patient Data Registered", "success")
}

}
