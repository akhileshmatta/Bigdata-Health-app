import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discharge-status',
  templateUrl: './discharge-status.component.html',
  styleUrls: ['./discharge-status.component.css']
})
export class DischargeStatusComponent implements OnInit {
  
  constructor(private db: ConnectDbService, private router: Router) { }

  ngOnInit(): void {
  }
 
  loadingFlag: boolean = false;
  flag: number = 0;
  patient_id: any = '';
  finalData: any = {};
  opensweetalert() {
    Swal.fire('Patient Discharged', 'discharged successfully', 'success')
  }
  validateForm() {
    if (!this.patient_id) {
      Swal.fire('Discharged Unsuccessfull', 'Enter patient ID feild', 'warning');      
      return false;
    }
    return true;
  }

  getRequirements(data: any) {
    
    console.log(data);
    if (!this.validateForm()) return;
    this.loadingFlag = true;
    let query = `insert into discharge_status set patient_id = '${this.patient_id}', `;
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = ${value ? 1 : 0}, `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      if (dt.errno != undefined) {
        this.loadingFlag = false;
        Swal.fire('Not Submitted', "data not registered", "error");
      } else {
        this.db.discharge(this.patient_id).subscribe(dt => {
          console.log(dt);
          this.loadingFlag = false;
          this.db.getPatientData(this.patient_id).subscribe(dt => {
            console.log(dt);
            if (dt.errno != undefined) {
              Swal.fire('Data retreival Unsuccessful', "Patient data not found", "error");
              return;
            }
            this.finalData = Object.entries(dt);
            this.finalData.shift();
            Swal.fire('Data fetched Successfully', "Patient data", "success");
          });
          Swal.fire('Discharged Successfully', "Patient discharged successfully", "success");
        }); 
      }
    });
  }

  printClaimForm() {
    this.router.navigateByUrl('claim-form');
  }

}
