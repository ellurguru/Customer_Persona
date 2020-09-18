import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemographicsComponent } from './demographics/demographics.component';
import { HomeComponent } from './home/home.component';
import { PiechartComponent } from './piechart/piechart.component';
import { PersonalComponent } from './personal/personal.component';
import { PieLiaComponent } from './pie-lia/pie-lia.component';
import { MenuComponent } from './menu/menu.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { NetworkGraphComponent } from './network-graph/network-graph.component';
//import { MapChartComponent } from './map-chart/map-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { SampleChartComponent } from './sample-chart/sample-chart.component';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full'},
{ path: 'home', component: HomeComponent},
{ path: 'demo', component: DemographicsComponent},
{ path: 'pie', component: PiechartComponent},
{ path: 'personal', component: PersonalComponent},
{ path: 'pie1', component: PieLiaComponent},
{ path: 'menu', component: MenuComponent},
{ path: 'loc', component: GmapsComponent},
{ path: 'net', component: NetworkGraphComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'map', component: MapComponent},
{ path: 'maps', component: LeafletMapComponent},
{ path:'network',component:SampleChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
