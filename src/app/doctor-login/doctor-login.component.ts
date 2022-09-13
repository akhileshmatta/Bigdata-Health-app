import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDbService } from '../services/connectDB/connect-db.service';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  constructor(private db: ConnectDbService, private router: Router, private sd: ShareDataService) { }

  ngOnInit(): void {
  }

  isValid(data: any) {
    if (!data.doctor_id) {
      window.alert('Enter proper id');
      return false;
    } 
    if (!data.doctor_password) {
      window.alert('Enter proper password');
      return false;
    }
    return true;
  }

  doctorAuth(data: any) {
    if (!this.isValid(data)) return;
    let query = `select * from doctor_auth where doctor_id = '${data.doctor_id}' and doctor_password = '${data.doctor_password}'`;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length === 0) {
        window.alert('username or password invalid');
        return;
      } else {
        this.sd.doctor.isLoggedIn = true;
        this.sd.doctor.doctor_id = data.doctor_id;
        this.router.navigateByUrl('/doctor-portal');
      }
    });
  }

}
