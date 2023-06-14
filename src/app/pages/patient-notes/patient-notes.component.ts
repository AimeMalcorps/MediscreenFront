import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-notes',
  templateUrl: './patient-notes.component.html',
  styleUrls: ['./patient-notes.component.scss']
})
export class PatientNotesComponent implements OnInit {
  patient: any = null;
  notesList: Note[] = [];
  noteForm: FormGroup;
  noteToAdd: Note;
  incompleteForm: boolean = false;

  constructor(public dataservice: DataService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.patient = this.dataservice.patient;
    if (this.patient != null) {
      this.getPatientNotes(this.patient.id);
      this.generateNoteForm();
    } else {
      this.getAllNotes();
    }
  }

  navigate(route: string) {
    this.router.navigate(['/' + route]);
  }

  generateNoteForm() {
    this.noteForm = this.fb.group({
      'note': this.fb.control(''),
    }, { updateOn: 'submit' });
  }

  getPatientNotes(patientId: number) {
    this.http.get<any>(environment.historyServer + '/patHistory/patient/' + patientId)
      .subscribe(res => {
        if (res) {
          this.notesList = res;
        } else {
          console.log('Error - getPatientNotes');
        }
      });
  }

  getAllNotes() {
    this.http.get<any>(environment.historyServer + '/patHistory/all')
      .subscribe(res => {
        if (res) {
          this.notesList = res;
        } else {
          console.log('Error - getAllNotes');
        }
      });
  }

  addPatientNote() {
    this.incompleteForm = false;
    if (this.noteForm.value.note == '') {
      this.incompleteForm = true;
    } else {
      this.noteToAdd = new Note();
      this.noteToAdd.patientId = this.patient.id;
      this.noteToAdd.note = this.noteForm.value.note;
      this.http.post<any>(environment.historyServer + '/patHistory/add', this.noteToAdd)
        .subscribe(res => {
          if (res) {
            this.getPatientNotes(this.patient.id);
          } else {
            console.log('Error - addPatientNote');
          }
          this.generateNoteForm();
        });
    }

  }

  deletePatientNote(note: Note) {
    this.http.get<any>(environment.historyServer + '/patHistory/delete/' + note.id)
      .subscribe(res => {
        if (res) {
          this.getPatientNotes(this.patient.id);
        } else {
          console.log('Error - deletePatientNote');
        }
      });
  }

}
