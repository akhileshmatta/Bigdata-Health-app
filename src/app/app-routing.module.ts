import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DiagnosticDataComponent } from './diagnostic-data/diagnostic-data.component';
import { DrugsDataComponent } from './drugs-data/drugs-data.component';
import { AmbulanceDataComponent } from './ambulance-data/ambulance-data.component';
import { HospitalManagementDataComponent } from './hospital-management-data/hospital-management-data.component';
import { InsuranceLoginComponent } from './insurance-login/insurance-login.component';
import { InsuranceDataComponent } from './insurance-data/insurance-data.component';
import { PatientDataRetreivalComponent } from './patient-data-retreival/patient-data-retreival.component';
import { PharmacyAddDrugComponent } from './pharmacy-add-drug/pharmacy-add-drug.component';
import { PharmacyDisplayDrugsComponent } from './pharmacy-display-drugs/pharmacy-display-drugs.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorPortalComponent } from './doctor-portal/doctor-portal.component';
import { DiagnosticsLoginComponent } from './diagnostics-login/diagnostics-login.component';
import { HospitalLoginComponent } from './hospital-login/hospital-login.component';
import { DiagnosticsResultsComponent } from './diagnostics-results/diagnostics-results.component';
import { PrintClaimformhgfComponent } from './print-claimformhgf/print-claimformhgf.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient-data-retreival', component: PatientDataRetreivalComponent },
  { path: 'diagnostic-data', component: DiagnosticDataComponent },
  { path: 'drugs-data', component: DrugsDataComponent },
  { path: 'ambulance-data', component: AmbulanceDataComponent },
  { path: 'hospital-management-data', component: HospitalManagementDataComponent },
  { path: 'insurance-login', component: InsuranceLoginComponent },
  { path: 'insurance-data', component: InsuranceDataComponent },
  { path: 'pharmacy-add-drugs', component: PharmacyAddDrugComponent },
  { path: 'pharmacy-display-drugs', component: PharmacyDisplayDrugsComponent },
  { path: 'doctor-login', component: DoctorLoginComponent },
  { path: 'doctor-portal', component: DoctorPortalComponent },
  { path: 'diagnostics-login', component: DiagnosticsLoginComponent },
  { path: 'hospital-login', component: HospitalLoginComponent },
  { path: 'diagnostics-results', component: DiagnosticsResultsComponent },
  { path: 'claim-form', component: PrintClaimformhgfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
