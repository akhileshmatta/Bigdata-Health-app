import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/shareData/share-data.service';
import { Router } from '@angular/router';
import { ConnectDbService } from '../services/connectDB/connect-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sd: ShareDataService,private router: Router, private db: ConnectDbService) { }

  bools: any = Array(7).fill(true);;
  hospitalId: string = '';
  isLoggedIn: boolean = false;
  pass: string = '';

  ngOnInit(): void {
    this.hospitalId = this.sd.hospital;
    this.isLoggedIn = localStorage.getItem('isHospitalLoggedIn') == 'true'
  }
  goToLogin = () => this.router.navigateByUrl('/sign-in');
  goTopatientRegister = () => this.router.navigateByUrl('/patient');
  goTopatientdataretreival = () =>this.router.navigateByUrl('/patient-data-retreival')
  goTopatientData = () => this.router.navigateByUrl('/patientbasic');
  goTodiagnosticdata = () => this.router.navigateByUrl('/diagnostic-data');
  goTodrugsdata = () => this.router.navigateByUrl('/drugs-data');
  goToambulancedata =() => this.router.navigateByUrl('/ambulance-data');
  goTohospitalmanagementdata =() => this.router.navigateByUrl('/hospital-management-data');
  goToadddrugs =() =>this.router.navigateByUrl('/pharmacy-add-drugs');
  goTodisplaydrugs =() =>this.router.navigateByUrl('/pharmacy-display-drugs');
  goTodoctorlogin =() =>this.router.navigateByUrl('/doctor-login');
  goTodiagnosticslogin =() =>this.router.navigateByUrl('/diagnostics-login')
  goTodiagnosticsresults =() =>this.router.navigateByUrl('/diagnostics-results')

}
