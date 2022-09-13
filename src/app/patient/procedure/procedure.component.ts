import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {

  constructor(private db: ConnectDbService) { }

  ngOnInit(): void { 
  }
  opensweetalert() {
    Swal.fire('Procedure Info updated', "data added", "success")
  }
  closesweetalert(val: any) {
    Swal.fire('Procedure Info not added', "Enter " + val + " field", "warning")
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


  addProcedure(data: any) {
    if (!this.validateForm(data)) {
      //this.closesweetalert();
      return;
    }
    let query = 'insert into procedure_table set ';
    for (let [key, value] of Object.entries(data)) {
      query += `${key} = '${value}', `;
    }
    query = query.slice(0, -2) + ';';
    this.db.processQuery(query).subscribe(dt => {
      console.log(dt);
      this.opensweetalert();
    });
  }

}
