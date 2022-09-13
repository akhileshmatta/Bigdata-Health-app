import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private sd: ShareDataService) { }

  ngOnInit(): void {
  }
  goToInsurancelogin =() => this.router.navigateByUrl('/insurance-login')
  goTohospitallogin =() =>this.router.navigateByUrl('/hospital-login')
  
  goToLogin(name: string) {
    this.sd.hospital = name;
    this.router.navigateByUrl('/login');
  }
}
