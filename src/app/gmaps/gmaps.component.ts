import {  Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { PersonaService } from '../persona.service';
//import { Observable } from 'rxjs';
import {Locations} from "./../locations";
import * as L from 'leaflet';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '../app.constants';
@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent {
 public message:any;
 public id:any;
 public categ:any;
map: Map;
  mapOptions: MapOptions;
  
  lastLayer: any;
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private pservice:PersonaService) { }
  

  ngOnInit(){
 this.initializeMapOptions();
 this.getmapsdata();
    }

    getmapsdata(): void {

      
    
    this.message=this.pservice.readMessage();
      console.log("hey im here!!!!!!!!!!!!!!!!!!!");
      console.log(this.message);
     for(let details of this.message){
     this.id=details.CLIENT_ID;
     }
     console.log(this.id);
     var ToDate=localStorage.getItem('ToDate');
     var FromDate=localStorage.getItem('FromDate');
     this.pservice.categorytop5(this.id,FromDate,ToDate).subscribe((data:any) => {
      const cate = data.map(data => data.CATEGORY);
      this.categ=cate;
     
      console.log(this.categ);
      this.pservice.mapplot(this.id,FromDate,ToDate).subscribe((data:any) => {
      const lat = data.map(data => data.TRANS_LATITUDE);
      const lon = data.map(data => data.TRANS_LONGITUDE);
      const cat = data.map(data => data.CATEGORY);
      const amt = data.map(data => data.AMOUNT);
      const place = data.map(data => data.BILLING_PLACE);
debugger
      const colormap : Record<string, string> = {
  "Department Stores": "pink", 
  "Health Insurance": "yellow",
  "Gasoline": "blue",
  "Rent": "orange",
  "supermarkets": "green",
  "Auto Insurance": "violet",
  "Balance Transfers": "Purple",
  "Credit card": "indigo", 
  "Auto Loan": "blue green",
  "Merchandise": "red",
  "Entertainment": "red orange",
  "Mortgage": "gray",
  "Travel": "blue violet",
  "Medical Services": "violet red",
  "atm": "dandelion", 
  "Automotive": "#C45AEC",
  "Technology": "apricot",
  "Home Improvement": "scarlet"};

  //console.log(colormap.Rent);
    var color;
     for(var i=0;i<lat.length;i++)
     {
      color=cat[i];
      console.log(colormap[color]);
      this.addSampleMarkerColor(lat[i],lon[i],cat[i],amt[i],place[i],colormap[color]);
     }
   }); 
   });
  }
     
  onMapReady(map: Map) {
    this.map = map;
    //this.addSampleMarker();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: [DEFAULT_LATITUDE, DEFAULT_LONGITUDE],
      zoom: 2,
      maxBounds:[[-100,-200],[90,100]],
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 50,
            attribution: ' '
          })
      ],
    };
  }

  private addSampleMarkerColor(lat,lon,cat,amt,place,color) {
    const marker = new Marker([lat, lon])
    .setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'+color+'.png'
      }));
  marker.addTo(this.map);
  this.map.getZoom();

  marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
   marker.on('mouseover', function (e) {
          this.openPopup();
      });
      marker.on('mouseout', function (e) {
          this.closePopup();
      });
}

  private addSampleMarker(lat,lon,cat,amt,place) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
     marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
  }

  private addSampleMarker0(lat,lon,cat,amt,place) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
     marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
  }
  private addSampleMarker1(lat,lon,cat,amt,place) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
    marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
  }
  private addSampleMarker2(lat,lon,cat,amt,place) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
    marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
  }
  private addSampleMarker3(lat,lon,cat,amt,place) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
    marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
  }
  private addSampleMarker4(lat,lon,cat,amt,place) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
    marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
  }
}