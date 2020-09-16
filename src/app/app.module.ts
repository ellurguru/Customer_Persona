import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HighChartDialogContentComponent } from './high-chart-dialog-content/high-chart-dialog-content.component';
import { PiechartComponent } from './piechart/piechart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonalComponent } from './personal/personal.component';
import { PieLiaComponent } from './pie-lia/pie-lia.component';
import { PieSecComponent } from './pie-sec/pie-sec.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GmapsComponent } from './gmaps/gmaps.component';
import { NetworkGraphComponent } from './network-graph/network-graph.component';
import { MapChartComponent } from './map-chart/map-chart.component';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { GeocodingComponent } from './geocoding/geocoding.component';
import { MapPointFormComponent } from './map-point-form/map-point-form.component';
import { ResultsListComponent } from './results-list/results-list.component';
//import { NominatimService } from './services/nominatim.service';
import { MapComponent } from './map/map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
@NgModule({
  declarations: [
    AppComponent,
    DemographicsComponent,
    HomeComponent,
    MenuComponent,
    HighChartDialogContentComponent,
    PiechartComponent,
    PersonalComponent,
    PieLiaComponent,
    PieSecComponent,
    GmapsComponent,
    NetworkGraphComponent,
    MapChartComponent,
    DashboardComponent,
    GeocodingComponent,
    MapPointFormComponent,
    ResultsListComponent,
    //NominatimService,
    MapComponent,
    LeafletMapComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    NgbModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    LeafletModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
