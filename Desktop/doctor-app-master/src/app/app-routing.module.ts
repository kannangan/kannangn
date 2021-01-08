import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent} from './home/home.component';

const routes: Routes = [
	{ path: 'about', component: AboutComponent},
	{ path: 'help', component: HelpComponent},
	{ path: '', component: HomeComponent}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AboutComponent, HelpComponent, HomeComponent];
