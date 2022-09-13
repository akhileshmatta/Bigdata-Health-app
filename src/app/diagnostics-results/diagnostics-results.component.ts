import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-diagnostics-results',
  templateUrl: './diagnostics-results.component.html',
  styleUrls: ['./diagnostics-results.component.css']
})
export class DiagnosticsResultsComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  data: any;
  keys: any = ['prescription_id', 'lab_id', 'diagnostic_id', 'patient_id', 'diagnostics_test_charges'];

  ngOnInit(): void {
  }

  getPatientInformation(searchBar: any) {
    let query1: string = `select * from diagnostics_test_results where patient_id = ${searchBar.patientId};`
    this.db.processQuery(query1).subscribe(dt => {
      if (dt.length === 0) {
        window.alert('invalid');
      } else {  
        console.log(dt);
        this.data = dt;
      }
    });
  }

}
