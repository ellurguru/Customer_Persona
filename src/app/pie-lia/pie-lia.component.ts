import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-lia',
  templateUrl: './pie-lia.component.html',
  styleUrls: ['./pie-lia.component.css']
})
export class PieLiaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
highcharts = Highcharts;
   chartOptions = {   
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Liabilities Information'   
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
            ['Savings Account',   50000],
            ['SB Account',       40000],
            {
               name: 'Current Account',
               y: 60000,
               sliced: true,
               selected: true
            },
            ['Joint Account',   10000],
         ]
      }]
   };
}

