import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-ambulance-data',
  templateUrl: './ambulance-data.component.html',
  styleUrls: ['./ambulance-data.component.css']
})
export class AmbulanceDataComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  data: any;
  keys: any = [];

  ngOnInit(): void {
  }

  getPatientInformation(searchBar: any) {
    let query1: string = `select * from ambulance_utilization_details ,ambulance_master where patient_id = ${searchBar.patientId};`
    this.db.processQuery(query1).subscribe(dt => {
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
  }

}
