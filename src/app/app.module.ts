import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { NgxPrintModule } from 'ngx-print';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShareDataService } from './services/shareData/share-data.service';
import { ConnectDbService } from './services/connectDB/connect-db.service';
import { PatientRegComponent } from './patient/patient-reg/patient-reg.component';
import { DrugsDescComponent } from './patient/drugs-desc/drugs-desc.component';
import { DiagnosticsComponent } from './patient/diagnostics/diagnostics.component';
import { PatientAmbulanceComponent } from './patient/patient-ambulance/patient-ambulance.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDataRetreivalComponent } from './patient-data-retreival/patient-data-retreival.component';
import { DiagnosticDataComponent } from './diagnostic-data/diagnostic-data.component';
import { DrugsDataComponent } from './drugs-data/drugs-data.component';
import { AmbulanceDataComponent } from './ambulance-data/ambulance-data.component';
import { HospitalManagementDataComponent } from './hospital-management-data/hospital-management-data.component';
import { InsuranceLoginComponent } from './insurance-login/insurance-login.component';
import { InsuranceDataComponent } from './insurance-data/insurance-data.component';
import { PharmacyAddDrugComponent } from './pharmacy-add-drug/pharmacy-add-drug.component';
import { PharmacyDisplayDrugsComponent } from './pharmacy-display-drugs/pharmacy-display-drugs.component';
import { PatientVisitDetailsComponent } from './patient/patient-visit-details/patient-visit-details.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorPortalComponent } from './doctor-portal/doctor-portal.component';
import { DealedPatientsComponent } from './doctor-portal/dealed-patients/dealed-patients.component';
import { DoctorPrescriptionComponent } from './doctor-portal/doctor-prescription/doctor-prescription.component';
import { DiagnosticsLoginComponent } from './diagnostics-login/diagnostics-login.component';
import { DiagnosticsDataEntryComponent } from './diagnostics-data-entry/diagnostics-data-entry.component';
import { DiagnosticsResultsComponent } from './diagnostics-results/diagnostics-results.component';
import { FooterComponent } from './footer/footer.component';
import { HospitalLoginComponent } from './hospital-login/hospital-login.component';
import { PatientMedicationDataComponent } from './patient-data-retreival/patient-medication-data/patient-medication-data.component';
import { PatientBasicDataComponent } from './patient-data-retreival/patient-basic-data/patient-basic-data.component';
import { PatientExpensesDataComponent } from './patient-data-retreival/patient-expenses-data/patient-expenses-data.component';
import { SurgeryComponent } from './patient/surgery/surgery.component';
import { ProcedureComponent } from './patient/procedure/procedure.component';
import { DischargeStatusComponent } from './patient/discharge-status/discharge-status.component';
import { LoadingComponent } from './loading/loading.component';
import { PrintClaimformhgfComponent } from './print-claimformhgf/print-claimformhgf.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    PatientRegComponent,
    DrugsDescComponent,
    DiagnosticsComponent,
    PatientAmbulanceComponent,
    PatientComponent,
    PatientDataRetreivalComponent,
    DiagnosticDataComponent,
    DrugsDataComponent,
    AmbulanceDataComponent,
    HospitalManagementDataComponent,
    InsuranceLoginComponent,
    InsuranceDataComponent,
    PharmacyAddDrugComponent,
    PharmacyDisplayDrugsComponent,
    PatientVisitDetailsComponent,
    DoctorLoginComponent,
    DoctorPortalComponent,
    DealedPatientsComponent,
    DoctorPrescriptionComponent,
    DiagnosticsLoginComponent,
    DiagnosticsDataEntryComponent,
    DiagnosticsResultsComponent,
    FooterComponent,
    HospitalLoginComponent,
    PatientMedicationDataComponent,
    PatientBasicDataComponent,
    PatientExpensesDataComponent,
    SurgeryComponent,
    ProcedureComponent,
    DischargeStatusComponent,
    LoadingComponent,
    PrintClaimformhgfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPrintModule
  ],
  providers: [
    ShareDataService,
    ConnectDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
