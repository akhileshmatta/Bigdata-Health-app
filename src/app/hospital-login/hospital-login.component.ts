import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDbService } from '../services/connectDB/connect-db.service';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
  selector: 'app-hospital-login',
  templateUrl: './hospital-login.component.html',
  styleUrls: ['./hospital-login.component.css']
})
export class HospitalLoginComponent implements OnInit {

  constructor(private router:Router, private db: ConnectDbService, private sd: ShareDataService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isHospitalLoggedIn') == 'true') {
      this.router.navigateByUrl('/login');
    }
  }

  isUserValid(data: any) {
    let query: string = `
      select * 
      from hospital_authentication
      where HospitalID = '${data.hospitalId}' and pwd = '${data.pass}';
    `;
    this.db.processQuery(query).subscribe(Data => {
      console.log(Data);
      if (Data.errno != undefined) {
        window.alert('error while connecting');
      } else if (Data.length === 0) {
        window.alert('password incorrect');
      } else {
        localStorage.setItem('isHospitalLoggedIn', 'true');
        this.router.navigateByUrl('/login');
      }
    });
  }
}
