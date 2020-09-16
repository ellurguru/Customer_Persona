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
highchartss = Highcharts;
   chartOptionss = {   
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Liabilities'   
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
            ['Credit Card',   50200],
            ['House Loan',       62000],
            {
               name: 'Auto Loan',
               y: 40000,
               sliced: true,
               selected: true
            },

         ]
      }]
   };
}
