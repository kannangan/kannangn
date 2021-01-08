import { Component, Input } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from '../add-patient/Patient';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

let patient: Patient;

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent {
	@Input() cp: Patient;
	constructor(public dialog: MatDialog) {
	}
	openDialog(): void {
		this.dialog.open(EditPatientComponentDialog, {
			width: '40%',
			minHeight: '400px',
		});
	}
	saveSender(p) {
		patient = p;
	}
}

@Component({
	selector: 'edit-add-patient-dialog',
	templateUrl: './edit-patient-dialog.component.html',
})
export class EditPatientComponentDialog {
  pat = patient;
  patientsCollection: AngularFirestoreCollection<Patient>;
  patients: Observable<Patient[]>;
  form;
  checked = false;
  constructor(private db: AngularFirestore,
	public dialogRef: MatDialogRef<EditPatientComponentDialog>,
) {}
  ngOnInit() {
  	this.patientsCollection = this.db.collection('patients');
  	this.patients = this.patientsCollection.valueChanges();
  	this.form = new FormGroup({
  		id: new FormControl(),
  		firstname: new FormControl('', Validators.compose([
  			Validators.pattern('[\\w\\-\\s\\/]+')])),
  		lastname: new FormControl('', Validators.compose([
  			Validators.pattern('[\\w\\-\\s\\/]+')])),
  		contact: new FormControl('', Validators.compose([
  			Validators.pattern('[\\w\\-\\s\\/]+')])),
  		notes: new FormControl('', Validators.required),
  		examinedOn: new FormControl(null),
  		examined: new FormControl(false),
  	});
  }
  onNoClick(): void {
  	this.dialogRef.close();
  }
   onEdit(newValue) {
	   this.db.collection('patients')
    .get()
    .subscribe((snapshot) => {
		snapshot.forEach(doc => {
			if (patient.firstname === doc.data().firstname && patient.lastname === doc.data().lastname && patient.contact === doc.data().contact) {
			this.editPatient(doc, newValue);
			}
		});
	});
}

	editPatient(oldValue, newValue) {
		let newNote = patient.notes + ' New Edit: \n' + newValue.notes;
		this.db.collection('patients').doc(oldValue.id).set({
			firstname: newValue.firstname,
			lastname: newValue.lastname,
			contact: newValue.contact,
			examinedOn: newValue.examinedOn,
			examined: newValue.examined,
			notes: newNote
		}).then(function() {
			console.log('Document successfully written!');
		})
		.catch(function(error) {
			console.error('Error writing document: ', error);
		});
	}
}
