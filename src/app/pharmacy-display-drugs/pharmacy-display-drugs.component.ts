import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';
@Component({
  selector: 'app-pharmacy-display-drugs',
  templateUrl: './pharmacy-display-drugs.component.html',
  styleUrls: ['./pharmacy-display-drugs.component.css']
})
export class PharmacyDisplayDrugsComponent implements OnInit {

  constructor(private db: ConnectDbService) { }
  data: any;
  keys: any = [];

  ngOnInit(): void {
  }
  getdrugInformation(searchBar: any) {
    let query1: string = `select * from drug_master where drug_id = ${searchBar.drug_id};`
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
