import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/shareData/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private sd: ShareDataService) { }

  button: string = '';

  ngOnInit(): void {
    this.button = localStorage.getItem('isHospitalLoggedIn') == 'true' ? 'Logout' : 'Login';
  }

  goToLogin = () => {
    if (localStorage.getItem('isHospitalLoggedIn') == 'true') {
      localStorage.removeItem('isHospitalLoggedIn');
      this.button = 'Login';
      this.home();
    } else this.router.navigateByUrl('/sign-in');
  };

  goToPortals() {
    if (localStorage.getItem('isHospitalLoggedIn') == 'true') {
      this.router.navigateByUrl('/login')
    } else this.router.navigateByUrl('/sign-in');;
  }

  home = () => this.router.navigateByUrl('/home');
  goTosignup = () => this.router.navigateByUrl('/sign-up');

}
