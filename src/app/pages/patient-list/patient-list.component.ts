import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Assessment } from 'src/app/models/assessment';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, OnDestroy {
  patientList: Patient[] = [];
  patientForm: FormGroup;
  patientToModify: any;
  patientToNotes: any = null;
  assessment: Assessment;
  formComplete: boolean = true;
  patientToSearch: Patient;
  assessmentView: boolean = false;

  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    public dataservice: DataService) { }

  ngOnInit(): void {
    this.patientToSearch = this.dataservice.patientFind;
    if (this.patientToSearch != null) {
      this.patientList[0] = this.patientToSearch;
    } else {
      this.getAllPatient();
    }
  }

  ngOnDestroy(): void {
    this.dataservice.patient = this.patientToNotes;
  }

  getAllPatient() {
    this.patientToModify = null;
    this.http.get<any>(environment.patientServer + '/patient/all')
      .subscribe(res => {
        if (res != null) {
          this.patientList = res;
        }
      });
  }

  editPatient(patient: Patient) {
    this.formComplete = true;
    for (let field in this.patientForm.controls) {
      if (this.patientForm.controls[field].value == '') {
        this.formComplete = false;
      }
    }
    if (this.formComplete) {
      patient.familly = this.patientForm.value.familly;
      patient.given = this.patientForm.value.given;
      patient.dob = this.patientForm.value.dob;
      patient.sex = this.patientForm.value.sex;
      patient.address = this.patientForm.value.address;
      patient.phone = this.patientForm.value.phone;

      this.http.post<any>(environment.patientServer + '/patient/update/' + patient.id, patient)
        .subscribe(res => {
          if (res != null) {
            this.patientToModify = null;
            if (this.patientToSearch != null)
            this.serachPatient(this.patientToSearch.familly);
          } else {
            this.getAllPatient();
          }
        });
    }
  }

  deletePatient(patient: Patient) {
    this.http.get<any>(environment.patientServer + '/patient/delete/' + patient.id)
      .subscribe(res => {
        if (res) {
          this.getAllPatient();
        } else {
          console.log('Error - deletePatient');
        }
      });
  }

  modifyPatientForm(patient: Patient) {
    this.patientForm = this.fb.group({
      'familly': this.fb.control(patient.familly),
      'given': this.fb.control(patient.given),
      'dob': this.fb.control(patient.dob),
      'sex': this.fb.control(patient.sex),
      'address': this.fb.control(patient.address),
      'phone': this.fb.control(patient.phone)
    }, { updateOn: 'submit' });

    this.patientToModify = patient;
  }

  serachPatient(patientName: string) {
    this.http.post<any>(environment.patientServer + '/patient/search', patientName)
      .subscribe(res => {
        if (res) {
          this.patientList[0] = res;
        } else {
          console.log('Error - serachPatient');
        }
      });
  }

  getPatientNotes(patient: Patient) {
    this.patientToNotes = patient;
    this.router.navigate(['/patientNotes']);
  }

  getPatientAssessment(patient: Patient) {
    this.http.post<any>(environment.assessmentsServer + '/assessment/patient/', patient)
      .subscribe(res => {
        if (res != null) {
          this.assessment = res;
          console.log(this.assessment);
          this.assessmentView = true;
        } else {
          console.log('Error - getPatientAssessment');
        }
      });
  }

}
