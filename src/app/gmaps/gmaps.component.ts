import {  Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { PersonaService } from '../persona.service';
import { MapserviceService } from '../leaflet-map/mapservice.service';
import { Mapmodel } from '../leaflet-map/mapmodel';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '../app.constants';
import {latLng, MapOptions, tileLayer, Map, Marker, icon, Popup, marker, LatLng} from 'leaflet';


@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent {

map: Map;
  mapOptions: MapOptions;
  mapmodels:Mapmodel[];
  lastLayer: any;
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private pservice:PersonaService,private mapservice:MapserviceService) { }

  ngOnInit(){
 this.initializeMapOptions();
 this.getmapsdata();
    }

    getmapsdata(): void {
      this.mapservice.getmapdetails().subscribe((data:any) => {
        this.mapmodels = data;
        console.log(this.mapmodels);
        const lat = data.map(data => data.TRANS_LATITUDE);
      console.log(lat);
      const lon = data.map(data => data.TRANS_LONGITUDE);
      console.log(lon);
      const cat = data.map(data => data.CATEGORY);
      console.log(cat);
      for(var i=0;i<lat.length;i++)
      this.addSampleMarker(lat[i],lon[i],cat[i]);
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

  private addSampleMarker(lat,lon,cat) {
      const marker = new Marker([lat, lon])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
    this.map.getZoom();

    marker.bindPopup("<b>"+cat+"<br>"+lat+"<br>"+lon+"<b>").openPopup();
  }
}