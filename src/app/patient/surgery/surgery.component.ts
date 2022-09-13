import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.css']
})
export class SurgeryComponent implements OnInit {
  constructor(private db: ConnectDbService) { }

  ngOnInit(): void {
  } 
  opensweetalert() {
    Swal.fire('Surgery Info updated', "Data added", "success")
  }
  closesweetalert(val: any) {
    Swal.fire('Surgery Info not updated', "Enter " + val + " field", "warning")
  }
  validateForm(data: any) {
    for (let [key, value] of Object.entries(data)) {
      if (!value) {
        // window.alert(`enter valid data in ${key} field`);
        this.closesweetalert(key);
        return false;
      }
    }
    return true;
  }

  addsurgery(data: any) {
    if (!this.validateForm(data)) {
      //this.closesweetalert();
      return;
    }
    
    let query = 'insert into surgery_table set ';
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = '${value}', `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      console.log(dt);
      this.opensweetalert();
      //window.alert(' details inserted');
    });
  }

}
