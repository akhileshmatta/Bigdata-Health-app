import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  flag: boolean = false;

  flagChange(dg=1) {
    this.flag = dg == 1 ? true : false;
  }

  ngOnInit(): void {
  }
  opensweetalert() {
    Swal.fire('Data Updated', "data added successfully", "success")
  }
  closesweetalert(val: any) {
    Swal.fire('Data not added', "Enter " + val + " feild", "warning")
  }
  validate(data: any): boolean {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      if(!value) {
          // console.log(data)
          // window.alert(`Enter a proper value in ${key} field`);
          this.closesweetalert(key);
          return false;
      } 
    }
    return true;
  }

  insertDetails(data: any) {
    if(!this.validate(data)) {
      //this.closesweetalert();
      return;
    }
    console.log(data);
    let shouldNot = ['patient_admission_primary_diagnosis', 'patient_admission_secondary_diagnosis', 'patient_admission_comorbidities', 'patient_admission_cause_original_date'];
    let query_1 = `insert into patient_visit_details set `
    for (let [key, value] of Object.entries(data)) {
      if (!shouldNot.includes(key)) 
        query_1 += `${key} = '${value}', `;
    }
    query_1 = query_1.slice(0, -2) + ';';
    let query_2 = `insert into patient_admission_details set patient_id = '${data.patient_id}', `;
    for (let key of shouldNot.slice(0, -1)) {
      query_2 += `${key} = '${data[key]}', `;
    }
    query_2 = query_2.slice(0, -2) + ';';
    let query = query_1 + query_2;
    console.log(query);
    this.db.processQuery(query).subscribe(dt => {
      if (dt.errno != undefined) {
        window.alert('Error while inserting');
      } else {
        // window.alert('Data inserted sucessful');
      }
      console.log(dt);
    });
  }

}
