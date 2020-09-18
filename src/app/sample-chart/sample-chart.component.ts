import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { ResultModel } from '../network-graph/result-model';
import { ResultCategoriesService } from '../network-graph/result-categories.service';

@Component({
  selector: 'app-sample-chart',
  templateUrl: './sample-chart.component.html',
  styleUrls: ['./sample-chart.component.css']
})
export class SampleChartComponent implements OnInit {
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
        height: "100%"
      },
      title: {
        text: ""
      },
      plotOptions: {
        networkgraph: {
          keys: ["from", "to"],
          layoutAlgorithm: {
            enableSimulation: true
          }
        }
      },
      series: []
    };

    constructor(private resService: ResultCategoriesService) {
      const self = this;
      this.chartCallback = chart => {
        self.chart = chart;
        this.onInitChart();
      };
    }
   ngOnInit() {}

   onInitChart() {
  //debugger
  this.resService.categorytop5().subscribe(
    response => {
        this.CategoryModel = response;
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
                  showInLegend: true
                },
                marker: {
                    radius: 55,
                  },
                nodes: [
                   
                   {
                    id: this.CategoryModel[0].CATEGORY,
                    color: 'red'
              
                  }, {
                    id: this.CategoryModel[1].CATEGORY,
                    color: 'orange'
                  },
                  {
                    id: this.CategoryModel[2].CATEGORY,
                    color: 'green'
                  },
                  {
                    id: this.CategoryModel[3].CATEGORY,
                    color: 'blue'
                  },
                  {
                    id: this.CategoryModel[4].CATEGORY,
                    color: 'pink'
                  }
                  ],
                data: [
                  ["John ", this.CategoryModel[0].CATEGORY],
                  ["John ", this.CategoryModel[1].CATEGORY],
                  ["John ", this.CategoryModel[2].CATEGORY],
                  ["John ", this.CategoryModel[3].CATEGORY],
                  ["John ", this.CategoryModel[4].CATEGORY]
                ]
              }
          ];
    
          self.updateFromInput = true;
        }, 2000);
      }
  }

