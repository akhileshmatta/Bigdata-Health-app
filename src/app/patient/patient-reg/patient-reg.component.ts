import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  ngOnInit(): void {
  }
  opensweetalert() {
    Swal.fire('Patient data updated', "Data Registered", "success")
  }
  closesweetalert(val: any) {
    Swal.fire('Not updated', "Enter " + val + " field", "warning")
  }
  validate(data: any): boolean {
    let josh: any = ['patient_pan_number', 'patient_voter_id', 'patient_aadhar', 'patient_primary_email', 'patient_middle_name'];
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      if(!josh.includes(key) && !value) {
          // console.log(data)
          //window.alert(`Enter a proper value in ${key} field`);
          this.closesweetalert(key);
          return false;
        
      } 
    }
    return true;
  }
 
  // validate(data: any): boolean {
  //   console.log(data);
  //   for (const [key, value] of Object.entries(data)) {
  //     if (!value) {
  //       window.alert(`Enter a proper value in ${key} field`);
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  reset(patient_id: any) {
    let query: string = `
      delete from patient_allergies where patient_id = '${patient_id}';
      delete from patient_vitals where patient_id = '${patient_id}';
      delete from email where patient_id = '${patient_id}';
      delete from address where patient_id = '${patient_id}';
      delete from patient_master where patient_id = '${patient_id}';    
    `;
    this.db.processQuery(query).subscribe(dt =>{
      console.log(dt);
    });
  }

  userRegister(data: any): boolean {
    if (!this.validate(data)) {
      //this.closesweetalert();
      return false;
    }
    this.opensweetalert(); 
    data.patient_id = Date.now() % 10 ** 9;
    data.email = data.patient_primary_email;
    // data.patient_id = '512318';
    let patient_master_props = [
      'patient_id', 'patient_dob', 
      'patient_first_name', 'patient_middle_name', 'patient_last_name',
      'patient_gender', 'patient_pan_number', 'patient_voter_id','InsuranceID',
      'patient_primary_address', 'patient_primary_email', 'patient_occupation','patient_phone_number',
      'patient_blood_group', 'patient_aadhar','bank_account_number','ifsc_code','bank_name','branch_name'
    ];
    let query_1 = `insert into patient_master set `;
    for (let field of patient_master_props) {
      if (data[field])
        query_1 += `${field} = '${data[field]}', `;
    }
    query_1 = query_1.slice(0, -2) + ';';
    this.db.processQuery(query_1).subscribe(dt => {
      if (dt.errno != undefined) {
        window.alert('user already registered');
        return;
      } 
    });
    let patient_vitals_props = [
      'hospital_id', 'doctor_id', 'event_id', 'patient_id', 
      'blood_pressure_systolic', 'blood_pressure_diastolic', 'height', 'weight', 'heartbeat',
      'temperature', 'sugar', 'respiration', 'recorder_name', 'recorded_date', 'recorded_time'
    ];
    let query_2 = `insert into patient_vitals set `;
    for (let field of patient_vitals_props) {
      if (data[field])
        query_2 += `${field} = '${data[field]}', `;
    }
    query_2 = query_2.slice(0, -2) + ';';
    let patient_allergies_props =[
     'patient_id', 'allergy_id','allergy_start_date','allergy_end_date', 'active_flag'
    ];
    let query_3 = `insert into patient_allergies set `;
    for (let field of patient_allergies_props) {
      query_3 += `${field} = '${data[field]}', `;
    }
    query_3 = query_3.slice(0, -2) + ';';
    let email_props=[
      'patient_id','email_type','email'
    ];
    let query_4 = `insert into email set `;
    for (let field of email_props) {
      query_4 += `${field} = '${data[field]}', `;
    }
    query_4 = query_4.slice(0, -2) + ';';
    let address_props=[
      'address_type','patient_id','address_street_1','address_building_no','address_area','address_city',
      'address_zipcode'
    ];
    let query_5 = `insert into address set `;
    for (let field of address_props) {
      query_5 += `${field} = '${data[field]}', `;
    }
    query_5 = query_5.slice(0, -2) + ';';
    let query = `${query_2} \n\n ${query_3} \n\n ${query_4} \n\n ${query_5}`;
    this.db.processQuery(query).subscribe(Data => {
      if (Data.errno != undefined) {
        this.reset(data.patient_id);
        Swal.fire('Error while inserting data', '', 'error');
        this.reset(data.patient_id);
      } else {
        Swal.fire(`patient ID  ${data.patient_id}`, 'success');
      }
    });
    return true;    
  }

}
