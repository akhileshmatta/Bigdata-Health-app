import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.css']
})
export class DoctorPrescriptionComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  counter: number = 0;
  drugClass: string = 'form-row';

  prescription = ['prescription_id','doctor_id','hospital_id','patient_id','patient_case_id'];

  drugName = ['Drug id', 'Drug Name', 'Drug Type', 'Drug Dosage', 'Number of times of day', 'Number of days'];
  dbDrugName = ['drug_id', 'drug_name', 'drug_type', 'drug_dosage', 'no_of_times_a_day', 'no_of_days'];

  drug_id: string = '';
  drug_name: string = '';
  drug_type: string = '';
  drug_dosage: string = '';
  no_of_times_a_day: string = '';
  no_of_days: string = '';

  drugs_in_list: any = [];

  ngOnInit(): void {
  }

  validateDrug(data: any): boolean {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      if(!value) {
        Swal.fire('drug not added', `Please enter proper value in ${key} field`, "error")
        return false;
      } 
    }
    Swal.fire('Drug added to the list', 'Press ok to continue', 'success');
    return true;
  }

  addTab() {
    let obj = new Object({
      'drug_id': this.drug_id, 
      'drug_name': this.drug_name,
      'drug_type': this.drug_type,
      'drug_dosage': this.drug_dosage,
      'no_of_times_a_day': this.no_of_times_a_day, 
      'no_of_days': this.no_of_days
    });
    if (!this.validateDrug(obj)) return;
    this.drug_id = '';
    this.drug_name = '';
    this.drug_type = '';
    this.drug_dosage = '';
    this.no_of_times_a_day = '';
    this.no_of_days = '';
    this.drugs_in_list[this.counter++] = obj;
  }

  validate(data: any) {
    if (this.drugs_in_list.length === 0) {
      return false;
    }
    return true;
  }

  insert(data: any) {
    console.log(data);
    if (!this.validate(data)) return;
    console.log(this.drugs_in_list);
    let query1 = `insert into prescription set prescription_status = 1, `;
    for (let key of this.prescription) {
      query1 += `${key} = '${data[key]}', `;
    }
    // str_to_date('${data.prescribed_date}', '%Y-%m-%d')
    query1 = query1.slice(0, -2) + ';';
    let query2 = `
      update prescription_drug
      set 
      drug_status = 0,
      end_date = least('${data.prescribed_date}', adddate(prescribed_date, no_of_days))
      where drug_status = 1 and prescription_id in (
        select prescription_id from prescription 
        where 
        patient_id = '${data.patient_id}' and 
        doctor_id = '${data.doctor_id}' and
        hospital_id = '${data.hospital_id}' and
        patient_case_id = '${data.patient_case_id}'
    );
    `;
    let query3 = '';
    let n = this.drugs_in_list.length;
    for (let i = 0; i < n; i++) {
      query3 += `
        insert into prescription_drug
        set 
        prescription_id = '${data.prescription_id}',
        drug_id = '${this.drugs_in_list[i].drug_id}',
        prescription_dosage = '${this.drugs_in_list[i].drug_dosage}',
        drug_status = 1,
        no_of_times_a_day = ${+this.drugs_in_list[i].no_of_times_a_day},
        no_of_days = ${+this.drugs_in_list[i].no_of_days},
        prescribed_date = '${data.prescribed_date}';
      `;
    }
    let query = query1 + query2 + query3;
    console.log(query);
    this.db.processQuery(query).subscribe(dt => {
      // console.log(dt);
      this.getPrevious(data.patient_id, data);
    });
  }

  removeDrug(index: number) {
    this.drugs_in_list.splice(index, 1);
    this.counter--;
  }

  updateDrug(index: number) {
    this.drug_id = this.drugs_in_list[index].drug_id;
    this.drug_name = this.drugs_in_list[index].drug_name;
    this.drug_type = this.drugs_in_list[index].drug_type;
    this.drug_dosage = this.drugs_in_list[index].drug_dosage;
    this.no_of_times_a_day = this.drugs_in_list[index].no_of_times_a_day;
    this.no_of_days = this.drugs_in_list[index].no_of_days;
    this.removeDrug(index);
  }

  flag: boolean = false;

  getPrevious(patient_id: any = '512316', data: any) {
    let fields = ['prescription_id', 'drug_id', 'prescription_dosage', 'drug_status', 'no_of_times_a_day', 'no_of_days', 'prescribed_date', 'end_date']
    let query: string = `
      select ${fields.join(', ')} from prescription_drug 
      where drug_status = 1 and prescription_id in (
        select prescription_id 
        from prescription
        where patient_id = '${patient_id}' 
      );
    `;
    this.db.processQuery(query).subscribe(dt => {
      // console.log(dt);
      if (dt.errno != undefined) {
        window.alert('error in connecting database');
      } else {
        if (!this.flag) {
          this.prev = dt;
          this.flag = true;
          this.insert(data);
        } else {
          this.cur = dt;
          this.drugs_in_list.length = 0;
          this.counter = 0;
        }
      }
    });
  }

  prev: any = [];
  cur: any = [];

  load(data: any) {
    this.flag = false;
    this.prev = this.getPrevious(data.patient_id, data);
  }

  show() {
    console.log(this.prev);
    console.log(this.cur);
  }

}