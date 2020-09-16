import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-high-chart-dialog-content',
  templateUrl: './high-chart-dialog-content.component.html',
  styleUrls: ['./high-chart-dialog-content.component.css']
})
export class HighChartDialogContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 highcharts1 = Highcharts;
  chartOptions1 = {   
     chart: {
        type: "area"
     },
     title: {
       text: ''
     },
     xAxis:{
       categories: ['1/3/2020', '1/4/2020', '1/5/2020', '1/6/2020', '1/7/2020', '1/8/2020'],
       tickmarkPlacement: 'on',
       title: {
          enabled: false
       }
     },
     yAxis : {
       title: {
          text: 'dollars'
       },
       labels: {
          formatter: function () {
             return this.value;
          }
       }
     },
     tooltip : {
       shared: true,
       valueSuffix: ' dollars'
     },
     plotOptions : {
       area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          
          marker: {
             lineWidth: 1,
             lineColor: '#666666'
          }
       }
     },
     credits:{
       enabled: false
     },
     series: [
        {
           name: 'Savings Account',
           data: [30000, 60000, 70000, 45000, 90000, 100000]
        }, 
        {
           name: 'SB Account',
           data: [43570, 120000, 55700, 135000, 98765, 37865]
        }, 
        {
           name: 'Current Account',
           data: [24000, 33000, 89000, 23564, 98765, 120000]
        }, 
        {
           name: 'Joint Account',
           data: [12000, 9600, 8800, 24000, 12659, 38000]
        }
        
     ]
  };

  highcharts2 = Highcharts;
  chartOptions2 = {   
     chart: {
        type: "area"
     },
     title: {
       text: ''
     },
     xAxis:{
       categories: ['1/3/2020', '1/4/2020', '1/5/2020', '1/6/2020', '1/7/2020', '1/8/2020'],
       tickmarkPlacement: 'on',
       title: {
          enabled: false
       }
     },
     yAxis : {
       title: {
          text: 'dollars'
       },
       labels: {
          formatter: function () {
             return this.value;
          }
       }
     },
     tooltip : {
       shared: true,
       valueSuffix: ' dollars'
     },
     plotOptions : {
       area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          
          marker: {
             lineWidth: 1,
             lineColor: '#666666'
          }
       }
     },
     credits:{
       enabled: false
     },
     series: [
        {
           name: 'Savings Account',
           data: [30000, 60000, 70000, 45000, 90000, 100000]
        }, 
        {
           name: 'SB Account',
           data: [43570, 120000, 55700, 135000, 98765, 37865]
        }, 
        {
           name: 'Current Account',
           data: [24000, 33000, 89000, 23564, 98765, 120000]
        }, 
        {
           name: 'Joint Account',
           data: [12000, 9600, 8800, 24000, 12659, 38000]
        }
        
     ]
  };
  highcharts3 = Highcharts;
  chartOptions3 = {   
     chart: {
        type: "area"
     },
     title: {
       text: ''
     },
     xAxis:{
       categories: ['1/3/2020', '1/4/2020', '1/5/2020', '1/6/2020', '1/7/2020', '1/8/2020'],
       tickmarkPlacement: 'on',
       title: {
          enabled: false
       }
     },
     yAxis : {
       title: {
          text: 'dollars'
       },
       labels: {
          formatter: function () {
             return this.value;
          }
       }
     },
     tooltip : {
       shared: true,
       valueSuffix: ' dollars'
     },
     plotOptions : {
       area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          
          marker: {
             lineWidth: 1,
             lineColor: '#666666'
          }
       }
     },
     credits:{
       enabled: false
     },
     series: [
        {
           name: 'Savings Account',
           data: [30000, 60000, 70000, 45000, 90000, 100000]
        }, 
        {
           name: 'SB Account',
           data: [43570, 120000, 55700, 135000, 98765, 37865]
        }, 
        {
           name: 'Current Account',
           data: [24000, 33000, 89000, 23564, 98765, 120000]
        }, 
        {
           name: 'Joint Account',
           data: [12000, 9600, 8800, 24000, 12659, 38000]
        }
        
     ]
  };
}


