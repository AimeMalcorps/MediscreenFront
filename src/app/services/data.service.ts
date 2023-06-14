import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  patientName: string;
  patientId: number;
  patient: any;
}
