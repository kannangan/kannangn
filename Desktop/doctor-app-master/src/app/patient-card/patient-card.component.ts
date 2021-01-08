import { Component, OnInit, Input} from '@angular/core';
import { Patient } from '../add-patient/Patient';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css']
})
export class PatientCardComponent implements OnInit {
  @Input() patient: Patient;
  durationInSeconds = 5;

  constructor( private db: AngularFirestore,
               private _snackBar: MatSnackBar) {
  }
  ngOnInit() {
  }

  onDelete(patient) {
    this._snackBar.open('Patient ' + patient.firstname + ' ' + patient.lastname + ' has been deleted' , 'Dismiss' , {
      duration: this.durationInSeconds * 1000,
    });
    this.db.collection('patients')
    .get()
    .subscribe((snapshot) => {
      snapshot.forEach(doc => {
  				if (patient.firstname === doc.data().firstname && patient.lastname === doc.data().lastname && patient.diagnosis === doc.data().diagnosis) {
          this.db.collection('patients').doc(doc.id).delete();
        }
      });
    });
  }
}
