import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  contact: string;
  examined: boolean;
  examinedOn?: any;
  notes?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  patientsCollection: AngularFirestoreCollection<Patient>;
  patients: Observable<Patient[]>;

  constructor( private db: AngularFirestore) {
  }

  ngOnInit() {
    this.patientsCollection = this.db.collection('patients');
    this.patients = this.patientsCollection.valueChanges();
  }

}
