import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-pharmacy-add-drug',
  templateUrl: './pharmacy-add-drug.component.html',
  styleUrls: ['./pharmacy-add-drug.component.css']
})
export class PharmacyAddDrugComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  ngOnInit(): void {
  }

  validateForm(data: any) {
    for (let [key, value] of Object.entries(data)) {
      if (!value) {
        window.alert(`enter valid data in ${key} field`);
        return false;
      }
    }
    return true;
  }

  addDrug(data: any) {
    if (!this.validateForm(data)) return;
    let query = 'insert into drug_master set ';
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = '${value}', `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      console.log(dt);
      window.alert('Drug details inserted');
    });
  }

}
