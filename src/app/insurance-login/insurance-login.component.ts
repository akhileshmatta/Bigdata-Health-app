import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDbService } from '../services/connectDB/connect-db.service';
@Component({
  selector: 'app-insurance-login',
  templateUrl: './insurance-login.component.html',
  styleUrls: ['./insurance-login.component.css']
})
export class InsuranceLoginComponent implements OnInit {

  constructor(private router: Router, private db: ConnectDbService) { }

  ngOnInit(): void {
  }

  validate(data: any) {
    console.log(data);
    if (!data.InsuranceID) {
      window.alert('Enter proper insuranceID');
      return;
    }
    if (!data.pwd) {
      window.alert('Enter proper password');
      return;
    }
    let query = `select * from insurance_authentication where InsuranceID = '${data.InsuranceID}' and pwd = '${data.pwd}';`;
    this.db.processQuery(query).subscribe(dt => {
      if (dt.length > 0) {
        this.goToInsurancedata();
      } else {
        window.alert('InsuranceID or password is Invalid');
      }
    });
  }

  goToInsurancedata =() => this.router.navigateByUrl('/insurance-data')
}
