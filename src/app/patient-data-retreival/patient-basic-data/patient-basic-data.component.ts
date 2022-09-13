import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';

@Component({
  selector: 'app-patient-basic-data',
  templateUrl: './patient-basic-data.component.html',
  styleUrls: ['./patient-basic-data.component.css']
})
export class PatientBasicDataComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  data: any;
  keys: any = [];
  flag=false;

  ngOnInit(): void {
    this.flag=false;
  }
  print(){
    return window.print(); 
  }

  getPatientInformation(searchBar: any) {
    if (searchBar == '') {
      this.flag = false;
      return;
    }
    let query: string = `select * from patient_master where patient_id = ${searchBar.patientId};`
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        window.alert('invalid');
      } else {
        this.keys = [];
        console.log(dt[0]);
        this.data = dt[0];
        for (const [key, value] of Object.entries(dt[0])) {
          this.keys.push(`${key}`);
        }
      }
    });
    this.flag=true;
  }
}
