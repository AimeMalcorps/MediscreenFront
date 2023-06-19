import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  patientFind: Patient;
  patientId: number;
  patient: any;
}
