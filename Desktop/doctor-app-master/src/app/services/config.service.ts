import { Injectable } from '@angular/core';
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
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  patientsCollection: AngularFirestoreCollection<Patient>;
  patients: Observable<Patient[]>;

  constructor( private db: AngularFirestore) {
  }
  loadConfig(): any {
    return new Promise((resolve, reject) => {
      this.patientsCollection = this.db.collection('patients');
      this.patients = this.patientsCollection.valueChanges();
      setTimeout(() => resolve(true), 2000);

    });
  }

}
