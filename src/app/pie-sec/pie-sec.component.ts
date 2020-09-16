import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-sec',
  templateUrl: './pie-sec.component.html',
  styleUrls: ['./pie-sec.component.css']
})
export class PieSecComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

highchartsz = Highcharts;
   chartOptionsz = {   
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Securities'   
      },
      credits: {
         enabled: false
       },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
      
            dataLabels: {
               enabled: false           
            },
      
            showInLegend: true
         }
      },
      series : [{
         type: 'pie',
         name: 'Assets',
         data: [
            ['Mutual Funds',   20200],
            ['Equities',       52000],
            {
               name: 'SIP',
               y: 40000,
               sliced: true,
               selected: true
            },

         ]
      }]
   };
}
