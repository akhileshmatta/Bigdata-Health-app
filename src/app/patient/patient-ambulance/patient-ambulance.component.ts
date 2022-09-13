import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-ambulance',
  templateUrl: './patient-ambulance.component.html',
  styleUrls: ['./patient-ambulance.component.css']
})
export class PatientAmbulanceComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  ngOnInit(): void {
  }
  
opensweetalert() {
  Swal.fire('Ambulance Info Updated', "Ambulance details added", "success")
}
closesweetalert(val: any) {
  Swal.fire('Ambulance Info not added', "Enter " + val + " feild", "warning")
}

  validateForm(data: any) {
    for (let [key, value] of Object.entries(data)) {
      if (!value) {
        this.closesweetalert(key);
        // window.alert(`enter valid data in ${key} field`);
        return false;
      }
    }
    return true;
  } 

  adddetails(data: any) { 
    if (!this.validateForm(data)) {
    //this.closesweetalert();
    return;
  }
    let query = 'insert into ambulance_utilization_details set ';
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = '${value}', `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      console.log(dt);
      Swal.fire('details inserted', 'Successful', 'success');
      // window.alert(' details inserted');
    });
  }


}
