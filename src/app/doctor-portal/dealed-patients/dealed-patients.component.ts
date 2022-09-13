import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDbService } from 'src/app/services/connectDB/connect-db.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';

@Component({
  selector: 'app-dealed-patients',
  templateUrl: './dealed-patients.component.html',
  styleUrls: ['./dealed-patients.component.css']
})
export class DealedPatientsComponent implements OnInit {

  constructor(private db: ConnectDbService, private sd: ShareDataService, private router: Router) { }

  data: any = [];

  ngOnInit(): void {
    this.getPatients(this.sd.doctor);
  }

  getPatients(doctor: any) {
    if (!doctor.isLoggedIn) {
      window.alert('doctor not logged in!');
      return;
    }
    let query: string = `
      select patient_id, patient_first_name, patient_middle_name, patient_last_name from patient_master
      where patient_id in (
        select patient_id 
        from patient_vitals 
        where doctor_id = '${doctor.doctor_id}'
      );
    `;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.errno != undefined) {
        window.alert('error while fetching data');
      } else if (dt.length === 0) {
        window.alert('no data');
      } else {
        this.data = dt;
      }
    });
  }

  loadPatient(patient_id: string) {
    this.sd.medicData.patient_id = patient_id;
    this.router.navigateByUrl('patient-data-retreival');    
  }

}
