import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { HomeComponent } from './home/home.component';
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
//import { MapsModule, MarkerService, LegendService, MapsTooltipService } from '@syncfusion/ej2-angular-maps';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { PersonaService } from './persona.service';
import { MY_DATE_FORMATS } from './my-date-formats';
import { NetworkOnDateComponent } from './network-on-date/network-on-date.component';
@NgModule({
  declarations: [
    AppComponent,
    DemographicsComponent,
    HomeComponent,
    HighChartDialogContentComponent,
    PiechartComponent,
    PersonalComponent,
    PieLiaComponent,
    PieSecComponent,
    GmapsComponent,
    DashboardComponent,
    DynamicChartComponent,
    NetworkOnDateComponent,

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
    //MapsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    LeafletModule
   
    
  ],
  providers: [PersonaService,{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
