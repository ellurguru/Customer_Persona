import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph'; 
HighchartsNetworkgraph(Highcharts);

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.css']
})
export class NetworkGraphComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}


highchart1 = Highcharts;
   chartOption1 = {   
     chart: {
     name:'gtyhu',
    type: 'networkgraph'
  },
  title: {
        text: 'Categories'
    },
  legend: {
    enabled: true,
    showInLegend: true
  },
  plotOptions: {
    series: {
      
       networkgraph: {
      layoutAlgorithm: {
      enableSimulation: true
      }
    }
    },
    showInLegend: true
  },
 series: [{
    marker: {
      radius: 40
      },

    dataLabels: {
      enabled: true,
      linkFormat: '',
      allowOverlap: true,
      showInLegend: true
    },
    textPath: {
      enabled: true,
      attributes: {
          dy: 14,
          startOffset: '45%',
          textLength: 80
      }
  },
     nodes: [{
      id: 'Node 1',
       marker: {
              radius: 40
            },
            name:'John'
      
    },
     {
      id: 'Auto Insurance',
      color: 'orange'
    },
    {
      id: 'Credit Card',
      color: 'green'
    },
 {
      id: 'Gasoline',
      color: 'DarkOliveGreen'
    },
 {
      id: 'Restuarants',
      color: 'PaleVioletRed'
    },

 {
      id: 'Technology',
      color: 'Teal'
    },
{
      id: 'Travel',
      color: 'Thistle'
    },
    ],
    data: [
   
      {from:'Node 1', to:'Auto Insurance'},
      {from:'Node 1', to:'Credit Card'},
      {from:'Node 1', to:'Gasoline'},
      {from:'Node 1', to:'Restuarants'},     
      {from:'Node 1',to: 'Technology'},
      {from:'Node 1',to: 'Travel'},
    ]
  }]
  }

  highchart2 = Highcharts;
   chartOption2 = {   
     chart: {
     name:'gtyhu',
    type: 'networkgraph'
  },
 title: {
        text: 'Categories'
    },
  legend: {
    enabled: true
  },
  plotOptions: {
    series: {
      
       networkgraph: {
      layoutAlgorithm: {
      enableSimulation: true
      }
    }
    }
  },
 series: [{
    marker: {
      radius: 40
    },
    dataLabels: {
      enabled: true,
      linkFormat: '',
      allowOverlap: false
    },
      nodes: [{
      id: 'Node 1',
       marker: {
              radius:40
            },
     name:'John'
    },


     {
      id: 'ATM',
      color: 'red',

    }, {
      id: 'Auto Insurance',
      color: 'orange'
    },
    {
      id: 'Auto Loan',
      color: 'green'
    },
    {
      id: 'Automotive',
      color: 'blue'
    },
    {
      id: 'Balance Transfers',
      color: 'pink'
    },
    {
      id: 'Health Insurance',
      color: 'purple'
    },
    {
      id: 'Department Stores',
      color: 'yellow'
    },
 {
      id: 'Entertainment',
      color: 'grey'
    },
 {
      id: 'Gasoline',
      color: 'DarkOliveGreen'
    },

 {
      id: 'Home Improvement',
      color: 'DarkSlateGray'
    },
    ],
    
    data: [
      {from:'Node 1', to:'ATM'},
      {from:'Node 1', to:'Auto Insurance'},
      {from:'Node 1', to:'Auto Loan'},
       {from:'Node 1', to:'Automotive'},
        {from:'Node 1', to:'Balance Transfers'},
         {from:'Node 1', to:'Department Stores'},
         {from:'Node 1', to:'Entertainment'},
        {from:'Node 1', to:'Gasoline'},
         {from:'Node 1', to:'Health Insurance'},
         {from:'Node 1',to:'Home Improvement'}



    ],

   
  }]
  }
}