import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemographicsComponent } from './demographics/demographics.component';
import { HomeComponent } from './home/home.component';
import { PiechartComponent } from './piechart/piechart.component';
import { PersonalComponent } from './personal/personal.component';
import { PieLiaComponent } from './pie-lia/pie-lia.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full'},
{ path: 'home', component: HomeComponent},
{ path: 'demo', component: DemographicsComponent},
{ path: 'pie', component: PiechartComponent},
{ path: 'personal', component: PersonalComponent},
{ path: 'pie1', component: PieLiaComponent},
{ path: 'loc', component: GmapsComponent},
{ path: 'dashboard/:client_id', component: DashboardComponent},
{ path: 'dashboard/:first', component: DashboardComponent},
{ path: 'dashboard/:last', component: DashboardComponent},
{ path: 'dashboard/:email', component: DashboardComponent},
{ path: 'chart/:client_id', component: DynamicChartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
