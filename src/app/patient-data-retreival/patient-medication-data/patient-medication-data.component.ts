import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-medication-data',
  templateUrl: './patient-medication-data.component.html',
  styleUrls: ['./patient-medication-data.component.css']
})
export class PatientMedicationDataComponent implements OnInit {


  patient_id: string = '';
  constructor(private db: ConnectDbService, private sd: ShareDataService) { }

  ngOnInit(): void {
    this.patient_id = this.sd.medicData.patient_id || '';
    console.log(this.patient_id);
    this.dailyDataDrugFlag = false;
    this.dailyDataSurgeryFlag = false;
    this.dailyDataProcedureFlag = false;
    this.dailyDataDiagnosticsFlag = false;
  }

  dailyDataDrugFlag: boolean = false;
  dailyDataSurgeryFlag: boolean = false;
  dailyDataProcedureFlag: boolean = false;
  dailyDataDiagnosticsFlag: boolean = false;
  
  dailyDataDrug: any = [];
  dailyDataSurgery: any = [];
  dailyDataProcedure: any = [];
  dailyDataDiagnostics: any = [];


  opensweetalert() {
    Swal.fire('Pateint logInfo obtained', 'data fetched', 'success');
  }
  closesweetalert(val: any) {
    Swal.fire('Patient data not found', 'Enter ' + val + ' feild', 'warning')
  }

  validate(data: any): boolean {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        //window.alert(`Enter a proper value in ${value} field`);
        this.closesweetalert(key);
        return false;
      }
    }
    return true;
  }

  insertDrug(data: any) {
    let query = `insert into drug_utilization set `;
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = '${value}', `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      console.log(dt);
      window.alert('Drug added');
    });
  }

  showDrugs(data: any) {
    let query = `
      select drug_name, tb.* from (select * from drug_utilization) tb
      inner join drug_master on drug_master.drug_id = tb.drug_id
      where 
      patient_id = '${data.patient_id}'
      and '${data.start_date}' <= drug_event_date
      and drug_event_date <= '${data.end_date}';
    `;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        this.dailyDataDrugFlag = false;
        //Swal.fire('No drugs data', '', 'warning')
        window.alert('No drugs data');
      } else {
        this.dailyDataDrugFlag = true;
      }
      dt.sort((a: any, b: any) => a.drug_event_date > b.drug_event_date ? 1 : -1);
      this.dailyDataDrug = dt;
      console.log(this.dailyDataDrug);
    });
  }

  showSurgery(data: any) {
    let query = `
      select diagnostic_name, tb.* from (
        select surgery_name, t.*
        from (
          select * from surgery_table 
          where 
          patient_id = '${data.patient_id}'
          and '${data.start_date}' <= surgery_date
          and surgery_date <= '${data.end_date}'
        ) t
        inner join surger_master on surger_master.surgery_id = t.surgery_id
      ) tb 
      inner join diagnostics_master on diagnostics_master.diagnostics_id = tb.diagnostics_id;
    `;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        this.dailyDataSurgeryFlag = false;
        window.alert('no data');
        //Swal.fire('No surgey data', '', 'warning')

      } else {
        this.dailyDataSurgeryFlag = true;
      }
      dt.sort((a: any, b: any) => a.surgery_date > b.surgery_date ? 1 : -1);
      this.dailyDataSurgery = dt;
      console.log(this.dailyDataSurgery);
    });
  }

  showProcedure(data: any) { 
    let query = `
      select diagnostic_name, tb.* from (
        select procedure_name, t.* 
        from (
          select * from procedure_table
          where
          patient_id = '${data.patient_id}'
          and '${data.start_date}' <= procedure_date
          and procedure_date <= '${data.end_date}'
          ) t
          inner join procedure_master on procedure_master.procedure_id = t.procedure_id
        )tb
      inner join diagnostics_master where diagnostics_master.diagnostics_id = tb.diagnostic_id;
    `;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        this.dailyDataProcedureFlag = false;
        window.alert('no data');
        //Swal.fire('No procedure data', '', 'warning')
      } else {
        this.dailyDataProcedureFlag = true;
      }
      dt.sort((a: any, b: any) => a.procedure_date > b.procedure_date ? 1 : -1);
      this.dailyDataProcedure = dt;
      console.log(this.dailyDataProcedure);
    });
  }

  
  showDiagnostics(data: any) {
    let query = `
      select lab_name, tb.* 
      from (
        select diagnostic_name, t.* 
        from (
          select * from diagnostics_test_results
          where 
          patient_id = '${data.patient_id}'
          and '${data.start_date}' <= diagnostic_test_date
          and diagnostic_test_date <= '${data.end_date}'
        ) t
        inner join diagnostics_master where diagnostics_master.diagnostics_id = t.diagnostic_id  
      ) tb
      inner join lab_master where lab_master.lab_id = tb.lab_id;
    `;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        this.dailyDataDiagnosticsFlag = false;
        window.alert('no data');
        //Swal.fire('No diagnostics data', '', 'warning')
        
      } else {
        this.dailyDataDiagnosticsFlag = true;
      }
      dt.sort((a: any, b: any) => a.diagnostic_test_date > b.diagnostic_test_date ? 1 : -1);
      this.dailyDataDiagnostics = dt;
      console.log(this.dailyDataDiagnostics);
    });
  }

  show(data: any) {
    if(!this.validate(data)) return;
    this.showDrugs(data);
    this.showSurgery(data);
    this.showProcedure(data);
    this.showDiagnostics(data);
    this.opensweetalert();
  }

}
