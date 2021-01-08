import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from '../add-patient/Patient';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



@Component({
	selector: 'app-add-patient',
	templateUrl: './add-patient.component.html',
	styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
	constructor(public dialog: MatDialog) {}

	openDialog(): void {
		this.dialog.open(AddPatientComponentDialog, {
			width: '60%',
			minHeight: '400px',
		});
	}
}

@Component({
	selector: 'app-add-patient-dialog',
	templateUrl: './add-patient-dialog.component.html',
})
export class AddPatientComponentDialog {
  patientsCollection: AngularFirestoreCollection<Patient>;
  patients: Observable<Patient[]>;

  form;
  checked = false;
  ngOnInit() {
  	this.patientsCollection = this.db.collection('patients');
  	this.patients = this.patientsCollection.valueChanges();

  	this.form = new FormGroup({
  		id: new FormControl(),
  		firstname: new FormControl('', Validators.compose([Validators.required,
  			Validators.pattern('[\\w\\-\\s\\/]+')])),
  		lastname: new FormControl('', Validators.compose([Validators.required,
  			Validators.pattern('[\\w\\-\\s\\/]+')])),
  		contact: new FormControl('', Validators.compose([Validators.required,
  			Validators.pattern('[\\w\\-\\s\\/]+')])),
  		notes: new FormControl(),
  		examinedOn: new FormControl(null),
  		examined: new FormControl(false),
  	});
  }
  constructor(private db: AngularFirestore,
              public dialogRef: MatDialogRef<AddPatientComponentDialog>,
  ) {}
  onNoClick(): void {
  	this.dialogRef.close();
  }
  onSubmit(patient) {
  	this.patientsCollection.add(patient);
  }

}
