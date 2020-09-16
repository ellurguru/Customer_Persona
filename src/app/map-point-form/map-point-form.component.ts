import { Component, OnInit,Input } from '@angular/core';
import {MapPoint} from '../shared/model/map-point.model';

@Component({
  selector: 'app-map-point-form',
  templateUrl: './map-point-form.component.html',
  styleUrls: ['./map-point-form.component.css']
})
export class MapPointFormComponent implements OnInit {

  @Input()
  mapPoint: MapPoint;

  constructor() { }

  ngOnInit(): void {
  }

}
