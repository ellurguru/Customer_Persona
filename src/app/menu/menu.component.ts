import { Component, OnInit } from '@angular/core';
import {chart} from 'highcharts';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

 highchartss = Highcharts;
   chartOptionss = {   
     chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy'
  },

  legend: {
    enabled: false
  },

  title: {
    text: 'Demo chart'
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true
      }
    }
  },

  series: [
  {
   data: [
                     [97, 36, 79], [94, 74, 60], [68, 76, 58], [64, 87, 56],
                     [68, 27, 73], [74, 99, 42], [7, 93, 87],  [51, 69, 40],
                     [38, 23, 33], [57, 86, 31]
                  ]
 
 },{
                  data: [
                     [25, 10, 87], [2, 75, 59],  [11, 54, 8],  [86, 55, 93],
                     [5, 3, 58],   [90, 63, 44], [91, 33, 17], [97, 3, 56],
                     [15, 67, 48], [54, 25, 81]
                  ]
               }
                  ]
}}

