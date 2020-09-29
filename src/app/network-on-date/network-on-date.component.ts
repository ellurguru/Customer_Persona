import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph'; 
HighchartsNetworkgraph(Highcharts);
import { ResultModel } from './../result-model';
import { PersonaService } from '../persona.service';
import {Demographics} from "./../demo";
@Component({
  selector: 'app-network-on-date',
  templateUrl: './network-on-date.component.html',
  styleUrls: ['./network-on-date.component.css']
})
export class NetworkOnDateComponent implements OnInit {

 public message:any;
 public id:any;
  public name:any;
   public CategoryModel1: any;
   public CategoryModel: ResultModel[];
    title = "Categories";
    chart;
    updateFromInput = false;
    Highcharts = Highcharts;
    chartConstructor = "chart";
    chartCallback;
       

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
            enableSimulation: true
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
 
this.message=this.pservice.readMessage();
      console.log("hey im here!!!!!!!!!!!!!!!!!!!");
      console.log(this.message);
     for(let details of this.message){
     this.id=details.client_id;
     this.name=details.first;
     }


console.log(this.id);
  this.pservice.categorytop5withdate(this.id).subscribe(
    response => {
        this.CategoryModel = response;
         this.CategoryModel1 = response;
         console.log(this.CategoryModel1);
      });
     
     
        const self = this,
        chart = this.chart;

        chart.showLoading();

        setTimeout(() => {
          chart.hideLoading();
    
          self.chartOptions.series = [
            {
                dataLabels: {
                  enabled: true,
                  linkFormat: '',
                  allowOverlap: true,
                  showInLegend: true,
                  align:'center',
                   style: {
                    textOutline: false 
                }
                },
               

                marker: {
                    radius: 55,
                  },
                nodes: [
                   
                   {
                    id: this.CategoryModel[0].CATEGORY,
                    color: 'green',
                    name:this.CategoryModel[0].CATEGORY+'<br/> Amount : '+this.CategoryModel[0].AMOUNT
                   
                  }, {
                    id: this.CategoryModel[1].CATEGORY,
                    color: 'red',
                    name:this.CategoryModel[1].CATEGORY+'<br/> Amount : '+this.CategoryModel[1].AMOUNT
                  },
                  {
                    id: this.CategoryModel[2].CATEGORY,
                    color: 'orange',
                    name:this.CategoryModel[2].CATEGORY+'<br/> Amount : '+this.CategoryModel[2].AMOUNT
                  },
                  {
                    id: this.CategoryModel[3].CATEGORY,
                    color: 'yellow',
                    name:this.CategoryModel[3].CATEGORY+'<br/> Amount : '+this.CategoryModel[3].AMOUNT
                  },
                  {
                    id: this.CategoryModel[4].CATEGORY,
                    color: 'violet',
                    name:this.CategoryModel[4].CATEGORY+'<br/> Amount : '+this.CategoryModel[4].AMOUNT
                  }
                  ],
                data: [
                  [this.name, this.CategoryModel[0].CATEGORY],
                  [this.name, this.CategoryModel[1].CATEGORY],
                  [this.name, this.CategoryModel[2].CATEGORY],
                  [this.name, this.CategoryModel[3].CATEGORY],
                  [this.name, this.CategoryModel[4].CATEGORY]
                ]
              }
          ];
    
          self.updateFromInput = true;
        }, 2000);

      }
}