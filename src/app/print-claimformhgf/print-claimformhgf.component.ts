import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';


@Component({
  selector: 'app-print-claimformhgf',
  templateUrl: './print-claimformhgf.component.html',
  styleUrls: ['./print-claimformhgf.component.css']
})
export class PrintClaimformhgfComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  patient_id: any = '';

  ngOnInit(): void {
  }

  flag: number = 0;
  patient_master: any;
  address: any;
  hospital_master: any;
  address3: any;
  hospital_id: any;
  patient_visit_details: any ;
  patient_expenses : any;
  ambulance_utilization_details : any;
  patient_master_dup: any;
  hospital_room_cateogory: any;
  case_id_patient: any;
  //diagnostics_test_charges: any;
  diagnostics_test_results : any;
  discharge_status: any;
  total: any;

  validateForm() {
    if (!this.patient_id) {
      window.alert('enter patient id');
      return false;
    }
    return true;
  }
  getPatientInformation() {
    let query: string = `select * from patient_master where patient_id = ${this.patient_id};`
    this.db.processQuery(query).subscribe(patient_master => {
      if (patient_master.length === 0) {
        // window.alert('invalid');
      } else {
        this.patient_master = patient_master;
        console.log(this.patient_master);      
      }
    });
  }
  dup_getPatientInformation() {
    let query: string = `select * from patient_master where patient_id = ${this.patient_id};`
    this.db.processQuery(query).subscribe(patient_master_dup => {
      if (patient_master_dup.length === 0) {
        window.alert('invalid');
      } else {
        // console.log(patient_master);
        this.patient_master_dup = patient_master_dup;
        // console.log(this.patient_master);      
      }
    });
  }

  getAddress() {
    let query: string = `select * from address where patient_id = ${this.patient_id};`
    this.db.processQuery(query).subscribe(address => {
      if (address.length === 0) {
        // window.alert('invalid');
      } else {
        this.address = address;
        console.log('address', this.address);      
          
      }
    });
  }
   getHospital() {
   let query: string = `select *  from hospital_master where hospital_id = (select hospital_id from patient_visit_details where patient_visit_details.patient_id = ${this.patient_id});`
    this.db.processQuery(query).subscribe(hospital_master => {
      if (hospital_master.length === 0) {
        window.alert('invalid');
     } else {
        this.hospital_master = hospital_master;
        console.log(this.hospital_master);      
      }
    });
  }
  getPatientvisitdetails(){
    let query: string = `select * from patient_visit_details where patient_id= ${this.patient_id};`
    this.db.processQuery(query).subscribe(patient_visit_details=>{
      if(patient_visit_details.length === 0) {
        // window.alert('invalid');
      }else{
        this.patient_visit_details = patient_visit_details;
        console.log(this.patient_visit_details);
      }
    });
  }
getPatientexpenses(){
  let query: string = `select * from patient_expenses where patient_id = ${this.patient_id};`
  this.db.processQuery(query).subscribe(patient_expenses=>{
    if(patient_expenses.length === 0){
      // window.alert('invalid');
    }else{
      this.patient_expenses = patient_expenses;
      console.log(this.patient_expenses);
    }
  });
}
getAmbulancedetails(){
  let query: string = `select * from ambulance_utilization_details where patient_id = ${this.patient_id};`
  this.db.processQuery(query).subscribe(ambulance_utilization_details=>{
    if(ambulance_utilization_details.length === 0){
      // window.alert('invalid');
    }else{
      this.ambulance_utilization_details = ambulance_utilization_details;
      console.log(this.ambulance_utilization_details);
    }
  });
}
 gethospitalroom(){
   let query: string = `SELECT room_cateogory_description 
                        FROM hospital_room_cateogory 
                        WHERE room_cateogory_id IN (
                          SELECT room_cateogory_id 
                          FROM hospital_room_bed 
                          WHERE bed_id IN (
                            SELECT bed_id 
                            FROM patient_visit_details 
                            WHERE patient_id = ${this.patient_id}
                          )
                        );
                      `
   this.db.processQuery(query).subscribe(hospital_room_cateogory=>{
     if(hospital_room_cateogory.length === 0){
      //  window.alert('invalid');
     }else{
       this.hospital_room_cateogory = hospital_room_cateogory;
       console.log(this.hospital_room_cateogory);
     }
   });

 }
getcaseidpatient(){
  let query: string = `select * from case_id_patient where patient_id = ${this.patient_id};`
  this.db.processQuery(query).subscribe(case_id_patient=>{
    if(case_id_patient.length === 0){
      // window.alert('invalid');
    }else{
      this.case_id_patient = case_id_patient;
      console.log(this.case_id_patient);
    }
  });
}

getDiagnosticexpenses(){
  let query: string = ` select sum(diagnostics_test_charges) as cost from diagnostics_test_results where patient_id = ${this.patient_id};`
  this.db.processQuery(query).subscribe(diagnostics_test_results=>{
    if(diagnostics_test_results.length === 0){
      // window.alert('invalid');
    }else{
      this.diagnostics_test_results = diagnostics_test_results;
      console.log(this.diagnostics_test_results);
    }
  });
}

getDischargeStatus(){
  let query: string = ` select * from discharge_status where patient_id = ${this.patient_id};`
  this.db.processQuery(query).subscribe(discharge_status=>{
    if(discharge_status.length === 0){
      // window.alert('invalid');
    }else{
      this.discharge_status = discharge_status;
      console.log(this.discharge_status);
    }
  });
}

  process() {
    this.getPatientInformation();
    this.dup_getPatientInformation();
    this.getAddress();
    this.getHospital();
    this.getPatientvisitdetails();
    this.getPatientexpenses();
    this.getAmbulancedetails();
    this.gethospitalroom();
    this.getcaseidpatient();
    this.getDiagnosticexpenses();
    this.getDischargeStatus();
}

  loadingFlag: boolean = false;
  finalData: any = {};

}
