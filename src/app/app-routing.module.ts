import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { HomeComponent } from './pages/home/home.component';
import { PatientNotesComponent } from './pages/patient-notes/patient-notes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'patientList', component: PatientListComponent},
  { path: 'patientNotes', component: PatientNotesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
