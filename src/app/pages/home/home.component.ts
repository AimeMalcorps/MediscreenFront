import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  addPatientForm: FormGroup;
  searchPatientForm: FormGroup;
  patientToAdd: Patient;
  formComplete: boolean = true;
  addPatientSuccess: boolean;
  patientNotFound: boolean = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private http: HttpClient,
    public dataservice: DataService) {
    this.createAddPatientForm();
    this.createSearchPatientForm();
  }

  ngOnDestroy() {
    this.dataservice.patientName = this.searchPatientForm.value.familly;
 }

  navigate(route: string) {
    this.router.navigate(['/' + route]);
  }

  createAddPatientForm() {
    this.addPatientForm = this.fb.group({
      'familly': this.fb.control(''),
      'given': this.fb.control(''),
      'dob': this.fb.control(''),
      'sex': this.fb.control(''),
      'address': this.fb.control(''),
      'phone': this.fb.control('')
    }, { updateOn: 'submit' });
  }

  createSearchPatientForm() {
    this.searchPatientForm = this.fb.group({
      'familly': this.fb2.control(''),
      }, { updateOn: 'submit' });
  }

  onSubmitAddPatient() {
    this.addPatientSuccess = false;
    this.formComplete = true;
    for (let field in this.addPatientForm.controls) {
      if (this.addPatientForm.controls[field].value == '') {
        this.formComplete = false;
      }
    }
    if (this.formComplete) {
      this.patientToAdd = new Patient();
      this.patientToAdd.familly = this.addPatientForm.value.familly;
      this.patientToAdd.given = this.addPatientForm.value.given;
      this.patientToAdd.dob = this.addPatientForm.value.dob;
      this.patientToAdd.sex = this.addPatientForm.value.sex;
      this.patientToAdd.address = this.addPatientForm.value.address;
      this.patientToAdd.phone = this.addPatientForm.value.phone;

      this.http.post<boolean>(environment.patientServer + '/patient/add', this.patientToAdd)
        .subscribe(res => {
          if (res) {
            this.addPatientSuccess = true;
          }
        });
        this.createAddPatientForm();
    }
  }

  onSubmitSearchPatient() {
    if (this.searchPatientForm.controls['familly'].value == '') {
      console.log(this.searchPatientForm.value.familly)
      this.patientNotFound = true;
    } else {
      this.navigate('patientList');
    }
  }

  getAllNotes() {
    this.dataservice.patient = null;
    this.router.navigate(['/patientNotes']);
  }

}
