import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs-desc',
  templateUrl: './drugs-desc.component.html',
  styleUrls: ['./drugs-desc.component.css']
})
export class DrugsDescComponent implements OnInit {

  constructor(private db: ConnectDbService) { }
  
  ngOnInit(): void {
    this.dailyDataFlag = false;
    this.cumDataFlag = false;
  }

  dailyDataFlag: boolean = false;
  prescriptionDataFlag: boolean = false;
  cumDataFlag: boolean = false;

  dailyData: any = [];
  prescriptionData: any = [];
  cumData: any = [];
  opensweetalert() {
    Swal.fire('Drugs Found', "acquired drugs found", "success")
  }
  closesweetalert(val: any) {
    Swal.fire('Drugs not found', "Enter " + val + " feild", "warning")
  }
  validate(data: any): boolean {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        this.closesweetalert(key);
        return false;
      }
    }
    return true;
  }
  dvalidate(data: any): boolean {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        Swal.fire('Drug not inserted', "Enter " + key + " feild", "warning");
        return false;
      }
    }
    return true;
  } 

  getPrescriptionId(data: any) {
    if(!this.dvalidate(data)) {
      //Swal.fire('Not Inserted', "Enter all required fields", "error");
      return;
    }
    let q = `select prescription_id from prescription where prescription_status = 1 and patient_id = '${data.patient_id}'`;
    this.db.processQuery(q).subscribe(dt => {
      if (dt.errno != undefined) {
        Swal.fire('Error in Connection Database', 'Connection error', 'error');
        return;
      } 
      if (dt.length === 0) {
        Swal.fire('No prescription given to patient', 'No prescription', 'error');
        return;
      } 
      data.prescription_id = dt[0].prescription_id;
      this.insertDrug(data);
    });
  } 

  insertDrug(data: any) {
    let query = `insert into drug_utilization set `;
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = '${value}', `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      console.log(dt);
      Swal.fire('Drug data updated', 'drug added', 'success');
    });
  }

  showDrugs(data: any) {
    if(!this.validate(data)) {
      //Swal.fire('Data not found', "Enter required fields", "error")
      return;
    }
    this.showPrescriptions(data);
    let _query = `
      select drug_name, t.*
      from (
        select * from drug_utilization 
        where 
        patient_id = '${data.patient_id}'
        and '${data.start_date}' <= drug_event_date
        and drug_event_date <= '${data.end_date}'
      ) t
      inner join drug_master on drug_master.drug_id = t.drug_id;
    `; 
    this.db.processQuery(_query).subscribe(dt => {
      if (dt.length === 0) {
        this.dailyDataFlag = false;
        Swal.fire('No Drug history', "Data not found", "error");
      } else {
        Swal.fire('Drugs data found', 'Data Found', 'success');
        this.dailyData = dt;
        this.dailyData.sort((a: any, b: any) => a.drug_event_date > b.drug_event_date ? 1 : -1);
        this.dailyDataFlag = true;
      }
      console.log(this.dailyData);
    });
  }

  showPrescriptions(data: any) {
    let query = `
      select drug_name, t.*
      from (
        select * from prescription_drug
        where 
        prescription_id in (
          select prescription_id from prescription
          where 
          patient_id = '${data.patient_id}'
          and '${data.start_date}' <= prescribed_date
          and prescribed_date <= '${data.end_date}'
        )
      ) t
      inner join drug_master on drug_master.drug_id = t.drug_id;
    `;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        this.dailyDataFlag = false;
        Swal.fire('Drug not added', "drug not inserted", "error");
      } else {
        Swal.fire('Drugs added', 'drug data updated', 'success');
        this.prescriptionData = dt;
        this.prescriptionData.sort((a: any, b: any) => a.drug_event_date > b.drug_event_date ? 1 : -1);
        console.log(this.prescriptionData);
        this.prescriptionDataFlag = true;
      }
    });
  }

}
