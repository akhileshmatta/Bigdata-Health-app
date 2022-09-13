import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-insurance-data',
  templateUrl: './insurance-data.component.html',
  styleUrls: ['./insurance-data.component.css']
})
export class InsuranceDataComponent implements OnInit {

  constructor(private db: ConnectDbService) { }
  
  data: any = [];

  ngOnInit(): void {
  }
 
  loadDetails(data: any) {
    this.db.getPatientData(data.patient_id).subscribe(dt => {
      console.log(dt);
      if (dt.errno != undefined) {
        Swal.fire('Data retreival Unsuccessful - 1', "Patient data not found", "error");
        return;
      }
      this.data = Object.entries(dt);
      this.data.shift();
      Swal.fire('Data fetched Successfully', "Patient data", "success");
    });
  }

  getPatientInformation(data: any) {
    this.data = [];
    data.patient_id = data.patient_id.trim();
    // let query = `select * from discharge_status where patient_id = '${data.patient_id}'`;
    // this.db.processQuery(query).subscribe(dt => {
    //   if (dt.errno != undefined || dt.length === 0) {
    //     Swal.fire('Data retreival Unsuccessful - 0', "Patient is not discharged yet", "error");
    //   } else {
    //     this.loadDetails(data);
    //   }
    // })
    this.loadDetails(data);
  }
}
