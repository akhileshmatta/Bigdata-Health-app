import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  hospital: string = '';
  isLoggedIn: boolean = false;
  doctor: any = {}; 
  medicData: any = {};

}
