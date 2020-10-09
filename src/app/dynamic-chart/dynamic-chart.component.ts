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
public data :any[] = [];

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
     this.id=details.client_id;
     this.name=details.first;
     Name=details.first;
     }

var ToDate=localStorage.getItem('ToDate');
var FromDate=localStorage.getItem('FromDate');
console.log(ToDate);
console.log(FromDate);

var cat;
var cat1;
  this.pservice.categorytop5(this.id,FromDate,ToDate).subscribe(
    response => {
    
        this.CategoryModel = response;
        cat=response;
         this.pservice.childnodes(this.id,FromDate,ToDate).subscribe(
    response => {
    cat1=response;
    console.log(cat1);

        const self = this,    
        chart = this.chart;
        var i=1;
var count=1;
        chart.showLoading();
        var dataarray=new Array();
        var nodesarray=new Array();
        var images='url(assets/images/person1.jpg)';

        setTimeout(() => {
          chart.hideLoading();

          cat.forEach(element => {
            dataarray.push({from:Name, to:element.CATEGORY});
            cat1.forEach(element1 =>{
            
            if(element.CATEGORY==element1.CATEGORY){
            if(count<=15){
            dataarray.push({from:element.CATEGORY,to:element1.BILLING_PLACE});}count++;}});
          });
          
          cat.forEach(element => {
          nodesarray.push({id:Name,name:' ', marker: {
            symbol: images,width:50,height:50,borderRadius:50

        }});

            nodesarray.push({id:element.CATEGORY, name:element.CATEGORY+'<br/> Amount : '+element.AMOUNT,color:colormap.get('top'+i),});
cat1.forEach(element1 => {

 if(element.CATEGORY==element1.CATEGORY){
 
            nodesarray.push({id:element1.BILLING_PLACE,name:'Place : '+element1.BILLING_PLACE+'<br/> Amount : '+element1.AMOUNT,color:colormap.get('top'+i), marker: {
                  radius: 20
                 }});
                 }
                 
          });i++;});
  
          self.chartOptions.series = [
            {
                dataLabels: {
                  enabled: true,
                borderRadius: 15,
                //backgroundColor: 'rgba(252, 255, 197, 0.7)',
                borderWidth: 1,
                //borderColor: '#AAA',
                padding:5,

                  linkFormat: '',
                  allowOverlap: true,
                  showInLegend: true,
                  align:'center',
                   style: {
                    textOutline: false,
                    textOverflow: 'ellipsis'
                },
              
                },
                marker: {
                    radius: 55,
                    symbol:'circle'
                  },
                  nodes:nodesarray,
                  data: dataarray
              }
          ];

          self.updateFromInput = true;
        }, 2000);

      });});
  }
}