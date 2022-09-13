import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-hospital-management-data',
  templateUrl: './hospital-management-data.component.html',
  styleUrls: ['./hospital-management-data.component.css']
})
export class HospitalManagementDataComponent implements OnInit {

  constructor(private db: ConnectDbService) { }
  data: any;
  keys: any = [];

  ngOnInit(): void {
  }
  gethospitalInformation(searchBar: any) {
    let query1: string = `select * from hospital_master where hospital_id = ${searchBar.hospital_id};`
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
