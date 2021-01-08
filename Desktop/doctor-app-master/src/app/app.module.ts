import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddPatientComponentDialog } from './add-patient/add-patient.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { PatientCardComponent } from './patient-card/patient-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { ConfigService } from './services/config.service';



import * as $ from 'jquery';
import { EditPatientComponent, EditPatientComponentDialog } from './edit-patient/edit-patient.component';


@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		AddPatientComponent,
		AddPatientComponentDialog,
		PatientCardComponent,
		routingComponents,
		EditPatientComponent,
		EditPatientComponentDialog

	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatMenuModule,
		MatIconModule,
		MatDialogModule,
		MatTooltipModule,
		MatInputModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCheckboxModule,
		MatRadioModule,
		MatCardModule,
		MatGridListModule,
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		MatSnackBarModule,
		MatStepperModule
	],
	providers: [{provide: APP_INITIALIZER, useFactory: configFactory, deps: [ConfigService], multi: true}],
	bootstrap: [AppComponent],
	entryComponents: [AddPatientComponentDialog, EditPatientComponentDialog]
})
export class AppModule { }

// TODO: Find a better place for this
export function configFactory(provider: ConfigService) {
	const configs = [
		provider.loadConfig(),
	];

	const splashScreenExit = new Promise((resolve, reject) => {
		Promise.all(configs).then(() => {
			$('.splash-screen').animate({ top: '100%' }, 400, () => resolve(true));
		});
	});

	return () => splashScreenExit;
}
