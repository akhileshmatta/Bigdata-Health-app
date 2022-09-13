import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-expenses-data',
  templateUrl: './patient-expenses-data.component.html',
  styleUrls: ['./patient-expenses-data.component.css']
})
export class PatientExpensesDataComponent implements OnInit {
  constructor(private db: ConnectDbService) { }

  flags: number = 0;

  data1: any = {};
  data2: any = {};
  data3: any = {};
  data4: any = {};
  data5: any = {};

  ngOnInit(): void { 
  }
  opensweetalert() {
    Swal.fire('Expenses data Found', "Expenses amount", "success")
  }
  closesweetalert(val: any) {
    Swal.fire('Expenses not found', "Enter " + val + " feild", "warning")
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

  getPatientInformationAmbulance(data: any) {
    let query: string = `
      select sum(ambulance_utilization_charges) as cost 
      from ambulance_utilization_details
      where patient_id = '${data.patient_id}' 
      and ambulance_used_from >= '${data.start_date}'
      and ambulance_used_to <= '${data.end_date}';`
    this.db.processQuery(query).subscribe(dt => {
      dt[0].name = 'ambulance_cost';
      console.log(dt[0]);
      this.data1 = dt[0];
      this.flags++;
    });
  }

  getPatientInformationDiagnostics(data: any) {
    let query: string = `
      select sum(diagnostics_test_charges) as cost 
      from diagnostics_test_results
      where 
      patient_id = '${data.patient_id}'
      and diagnostic_test_date >= '${data.start_date}'
      and diagnostic_test_date <= '${data.end_date}';`;
    this.db.processQuery(query).subscribe(dt => {
      dt[0].name = 'diagnostics_cost';
      console.log(dt[0]);
      this.data2 = dt[0];
      this.flags++;
    });
  }

  getPatientInformationSurgery(data: any) {
    let query: string = `
      select sum(surgery_charges * tb.ct) as cost 
      from (
	      select surgery_id, count(surgery_id) as ct
	      from surgery_table
	      where patient_id = '${data.patient_id}'
	      and surgery_date >= '${data.start_date}'
	      and surgery_date <= '${data.end_date}'
	      group by surgery_id
      ) tb
      inner join surger_master on surger_master.surgery_id = tb.surgery_id;`;
    this.db.processQuery(query).subscribe(dt => {
      dt[0].name = 'surgery_cost';
      console.log(dt[0]);
      this.data3 = dt[0];
      this.flags++;
    });
  }

  getPatientInformationDrug(data: any) {
    let query: string = `
      select sum(ct * drug_cost) as cost
      from (
        select drug_id, sum(acquired_medicines) as ct
        from drug_utilization
        where patient_id = '${data.patient_id}'
        and drug_event_date >= '${data.start_date}'
        and drug_event_date <= '${data.end_date}'
        group by drug_id
      ) tb
      inner join drug_master on drug_master.drug_id = tb.drug_id;`;
    this.db.processQuery(query).subscribe(dt => {
      dt[0].name = 'drug_cost';
      console.log(dt[0]);
      this.data4 = dt[0];
      this.flags++;
    });
  }

  getPatientInformationProcedures(data: any) {
    let query: string = `
      select sum(procedure_charges * tb.ct) as cost 
      from (
        select procedure_id, count(procedure_id) as ct
        from procedure_table
        where patient_id = '${data.patient_id}'
        and procedure_date >= '${data.start_date}'
        and procedure_date <= '${data.end_date}'
        group by procedure_id
      ) tb
      inner join procedure_master on procedure_master.procedure_id = tb.procedure_id;`;
    this.db.processQuery(query).subscribe(dt => {
      dt[0].name = 'procedure_cost';
      console.log(dt[0]);
      this.data5 = dt[0];
      this.flags++;
    });
  }

  getPatientInformation(data: any) {
    if(!this.validate(data)) return;
    this.flags = 0;
    this.getPatientInformationAmbulance(data);
    this.getPatientInformationDiagnostics(data);
    this.getPatientInformationSurgery(data);
    this.getPatientInformationDrug(data);
    this.getPatientInformationProcedures(data);
    this.opensweetalert();
  }

}
