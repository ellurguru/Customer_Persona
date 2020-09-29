import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph'; 
HighchartsNetworkgraph(Highcharts);
import { ResultModel } from './../result-model';
import { PersonaService } from '../persona.service';
import {Demographics} from "./../demo";
import { DefaultMatCalendarRangeStrategy } from '@angular/material/datepicker';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {
 public message:any;
 public id:any;
 public name:any;

   public CategoryModel: ResultModel[];
    title = "Categories";
    chart;
    updateFromInput = false;
    Highcharts = Highcharts;
    chartConstructor = "chart";
    chartCallback;
    chartCallback1;
    chartOptions = {
      chart: {
        type: "networkgraph",
      },
      title: {
        text: "Categories Based On Total Money Spent"
      },
      
      plotOptions: {
        networkgraph: {
          keys: ["from", "to"],
          layoutAlgorithm: {
            enableSimulation: true,

          }
        }
      },
      series: [],
      tooltip:{}
    };

    constructor(private pservice: PersonaService) {
      const self = this;
      this.chartCallback = chart => {
        self.chart = chart;
        this.onInitChart();
      };
    }
   ngOnInit() {

  }

   onInitChart() {
//Using Map
let colormap = new Map<string, string>();

colormap.set("top1", "green");
colormap.set("top2", "red");
colormap.set("top3", "yellow");
colormap.set("top4", "orange");
colormap.set("top5", "grey");
    
var Name;
   this.message=this.pservice.readMessage();
     for(let details of this.message){
     this.id=details.CLIENT_ID;
     this.name=details.FIRST;
     Name=details.FIRST;
     }

var ToDate=localStorage.getItem('ToDate');
var FromDate=localStorage.getItem('FromDate');
var cat;
  this.pservice.categorytop5(this.id,FromDate,ToDate).subscribe(
    response => {
    
        this.CategoryModel = response;
        cat=response;
        const self = this,    
        chart = this.chart;
        var i=1;

        chart.showLoading();
        var dataarray=new Array();
        var nodesarray=new Array();
        setTimeout(() => {
          chart.hideLoading();

          cat.forEach(element => {
            dataarray.push({from:Name, to:element.CATEGORY});
            dataarray.push({from:element.CATEGORY,to:element.BILLING_PLACE});
          });
          
          cat.forEach(element => {
            nodesarray.push({id:element.CATEGORY, name:element.CATEGORY+'<br/> Amount : '+element.AMOUNT,color:colormap.get('top'+i)});
            nodesarray.push({id:element.BILLING_PLACE,name:'Place : '+element.BILLING_PLACE+'<br/> Max_amount : '+element.MAX_AMOUNT,color:colormap.get('top'+i), marker: {
                  radius: 20,
                 }});
                 i++;
          });
  
          self.chartOptions.series = [
            {
                dataLabels: {
                  enabled: true,

                  linkFormat: '',
                  allowOverlap: false,
                  showInLegend: true,
                  align:'center',
                   style: {
                    textOutline: false 
                }
                },
                marker: {
                    radius: 55,
                  },
                  nodes:nodesarray,
                  data: dataarray
              }
          ];
          self.updateFromInput = true;
        }, 2000);
      });
  }
}