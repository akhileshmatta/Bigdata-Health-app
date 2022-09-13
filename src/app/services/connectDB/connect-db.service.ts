import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectDbService {

  constructor(private httpClient: HttpClient) { }

  processQuery(query: string): Observable<any> {
    let params = {'statement': query };
    return this.httpClient.get('http://localhost:13467/query', { params });
  }

  discharge(patient_id: number): Observable<any> {
    let params = {'patient_id': patient_id}
    return this.httpClient.get('http://localhost:13467/discharge', { params });
  }

  getPatientData(patient_id: any): Observable<any> {
    let params = {'patient_id': patient_id}
    return this.httpClient.get('http://localhost:13467/insurance', { params });
  }

}
