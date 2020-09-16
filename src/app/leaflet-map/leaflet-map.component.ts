import { Component, OnInit } from '@angular/core';
import { MapserviceService } from './mapservice.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Mapmodel } from './mapmodel';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '../app.constants';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, Marker, marker, tileLayer} from 'leaflet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {

  map: Map;
  Mapmodel: Mapmodel[];
  options: MapOptions;
  lastLayer: any;

  //results: MapserviceService[];
  private subs = new Subscription();
  constructor(private http: HttpClient,private mapservice:MapserviceService) { }

  ngOnInit () {
    this.initializeMapOptions();
    //this.getmapsdata();
  }

  getmapsdata(): void {
    this.mapservice.getmapdetails().subscribe((data:any) => {
      this.Mapmodel = data;
      console.log(this.Mapmodel);
    });
  }

  initializeMap (map: Map) {
    this.map = map;
    this.createMarker();
  }
  onMapReady(map: Map) {
    this.map = map;
    this.createMarker();
  }

  private initializeMapOptions () {
    this.options = {
      center: [39.8282, -98.5795],
      zoom: 5,
      maxBounds:[[-100,-200],[90,100]],
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 35,
            attribution: ' '
          })
      ],
    };
  }

  private createMarker () {
    //for (var i = 0; i < Mapmodel.length; i++) {
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([DEFAULT_LATITUDE, DEFAULT_LONGITUDE]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
    //}
  }

  private getDefaultIcon () {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private clearMap () {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }
  
}
