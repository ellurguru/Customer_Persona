import {  Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { PersonaService } from '../persona.service';
//import { Observable } from 'rxjs';
import {Locations} from "./../locations";
import * as L from 'leaflet';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '../app.constants';
import { MarkerManager } from '@agm/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent {
 
@Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
 public message:any;
 public id:any;
 public categ:any;
map: Map;
  mapOptions: MapOptions;
  
  lastLayer: any;
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private pservice:PersonaService) { }
  

  ngOnInit(){
    this.resetFormSubject.subscribe(response => {
      if(response){
        this.getmapsdata();
      // Or do whatever operations you need.
    }
   });
 this.initializeMapOptions();
 this.getmapsdata();
    }
    
    getmapsdata(): void {
      debugger;
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

      const colormap : Record<string, string> = {
        "top1": "green",
        "top2": "red", 
        "top3": "yellow",
        "top4": "orange",
        "top5": "grey",
        "default": "blue"};

     for(var i=0;i<lat.length;i++)
     {

      if(this.categ[0]==cat[i])
      {
        this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top1']);
      }
      else if(this.categ[1]==cat[i])
      {
        this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top2']);
      }
      else if(this.categ[2]==cat[i])
      {
        this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top3']);
      }
      else if(this.categ[3]==cat[i])
      {
        this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top4']);
      }
      else if(this.categ[4]==cat[i])
      {
        this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top5']);
      }
      else
      {
        this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['default']);
      }
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

  private addSampleMarker(lat,lon,cat,amt,place,color) {
    var marker = new Marker([lat, lon])
    .setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'+color+'.png'
        //iconUrl: 'my-icon.png',
        //className: 'blink'
      }));
      
  //L.DomUtil.addClass(marker._icon, "blink");
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