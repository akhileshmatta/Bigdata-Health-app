import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-drugs-data',
  templateUrl: './drugs-data.component.html',
  styleUrls: ['./drugs-data.component.css']
})
export class DrugsDataComponent implements OnInit {

  constructor(private db: ConnectDbService) { }
  data: any;
  keys: any = [];

  ngOnInit(): void {
  }
  getpatientInformation(searchBar: any) {
    let query1: string = `select * from prescription_drug where prescription_id = ${searchBar.prescription_id };`
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
