import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diagnostics-data-entry',
  templateUrl: './diagnostics-data-entry.component.html',
  styleUrls: ['./diagnostics-data-entry.component.css']
})
export class DiagnosticsDataEntryComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  arr: any;

  pname: string = '';
  pvalue: string = '';

  ngOnInit(): void {
    this.arr = [];
  }
  opensweetalert() {
    Swal.fire('Data Submitted', 'Patient Data registered', 'success')
  }
  
 closesweetalert() {
    Swal.fire('Data Data Submitted', "Patient Data Not Registered", "error")
  }
  validateForm(data: any) {
    for (let [key, value] of Object.entries(data)) {
      if (!value) {
        // window.alert(`enter valid data in ${key} field`);
        return false;
      }
    }
    return true;
  }


  addDiag() {
    //this.validate();
    let obj = new Object({
      diagnostics_test_parameter_name: this.pname,
      diagnostics_test_parameter_value: this.pvalue
    });
    this.pname = this.pvalue = '';
    this.arr[this.arr.length] = obj;
  }

  removeDiag(index: number) {
    this.arr.splice(index, 1);
  }

  updateDiag(index: number) {
    this.pname = this.arr[index].diagnostics_test_parameter_name;
    this.pvalue = this.arr[index].diagnostics_test_parameter_value;
    this.removeDiag(index);
  }

  insertRows(data: any) {
    data.diagnostics_test_parameter_name = 1;
    data.diagnostics_test_parameter_value = 1;
    if(!this.validateForm(data)) {
      this.closesweetalert();
      return;
    }
    delete data.diagnostics_test_parameter_name;
    delete data.diagnostics_test_parameter_value;
    this.opensweetalert();
    let baseQuery = `
      insert into diagnostics_test_results set 
      patient_id = '${data.patient_id}',
      lab_id = '${data.lab_id}',
      diagnostic_id = '${data.diagnostic_id}',
      prescription_id = '${data.prescription_id}',
      diagnostics_test_charges = '${data.diagnostics_test_charges}',
      diagnostic_test_date='${data.diagnostic_test_date}'
    `;
    let query = '';
    for (let i of this.arr) {
      query += `
        ${baseQuery}, 
        diagnostics_test_parameter_name = '${i.diagnostics_test_parameter_name}', 
        diagnostics_test_parameter_value = '${i.diagnostics_test_parameter_value}';
      `;
    }
    console.log(query);
    //return;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.errno != undefined) {
        this.closesweetalert();
      } else {
        this.opensweetalert();
      }
    });    
  }

}
