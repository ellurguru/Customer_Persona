import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PersonaService } from '../persona.service';
import {Demographics} from "./../demo";
import { ResultModel } from './../result-model';
import {FormControl} from '@angular/forms';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph'; 
HighchartsNetworkgraph(Highcharts);
import { HttpClient} from '@angular/common/http';
//import { Observable } from 'rxjs';
import * as L from 'leaflet';
import {tileLayer, Map, Marker, icon} from 'leaflet';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '../app.constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

private map;
private mapOptions;
mySubscription: any;
public mess :any[] = [];
public CategoryModel: ResultModel[];
public id:any;
public fromd:any;
public tod:any;
public from_date:any;
ToDate = new FormControl(new Date(localStorage.getItem('ToDate')));
FromDate = new FormControl(new Date(localStorage.getItem('FromDate')));

  ngOnInit() {
    localStorage.removeItem("category");
      this.mess=this.pservice.readMessage();
      console.log("hey im here!!");
      console.log(this.mess);  
      for(let details of this.mess){
     this.id=details.client_id;
     }
     this.initializeMapOptions();
     this.getmapsdata();
   
     const self = this;
      this.chartCallback = chart => {
        self.chart = chart;
        debugger
        this.onInitChart();
      };  
  }
  onSubmit() {
      localStorage.setItem("ToDate", this.ToDate.value.getFullYear() + "-" + this.ToDate.value.getMonth() + "-" + this.ToDate.value.getDate());
      localStorage.setItem("FromDate", this.FromDate.value.getFullYear() + "-" + this.FromDate.value.getMonth() + "-" + this.FromDate.value.getDate());
      localStorage.removeItem("category");
      this.onInitChart();
      this.getmapsdata();
  }

 // <------------------------- Network chart----------------------------------->

    public message:any;
    public name:any;
    title = "Categories";
    chart;
    updateFromInput = false;
    Highcharts = Highcharts;
    chartConstructor = "chart";
    chartCallback;
    chartOptions = {
      chart: {
        type: "networkgraph"
        
       },
      title: {
        text: ""
      },
      
      plotOptions: {
        networkgraph: {
     
      keys: ['from', 'to'],
      layoutAlgorithm: {
        enableSimulation: true,
      },

    }
      },
      series: [],
      tooltip:{}
    };
  Name;
   onInitChart() {
//Using Map
const colormap1 : Record<string, string> = {
  "top1": "green",
  "top2": "red", 
  "top3": "yellow",
  "top4": "orange",
  "top5": "grey",
  "default": "blue"};

   this.message=this.pservice.readMessage();
     for(let details of this.message){
     this.id=details.CLIENT_ID;
     this.name=details.FIRST;
     this.Name=details.FIRST;
     }

var ToDate=localStorage.getItem('ToDate');
var FromDate=localStorage.getItem('FromDate');
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
        //chart.showLoading();
        var dataarray=new Array();
        var nodesarray=new Array();
        var images='url(assets/images/person.jpg)'
        //setTimeout(() => {
         // chart.hideLoading();
          cat.forEach(element => {
            dataarray.push({from:this.Name, to:element.CATEGORY});
             if(count<=15){
              cat1.forEach(element1 =>{
            
            if(element.CATEGORY==element1.CATEGORY){
              debugger
            if(localStorage.getItem("category")==element.CATEGORY)
            {
              dataarray.push({from:element.CATEGORY,to:element1.BILLING_PLACE});
            }
          }});}count++;
          });
          
          cat.forEach(element => {
            
            nodesarray.push({id:this.Name, marker:{symbol:images,height:100,width:100,shape:L.Circle},dataLabels: {
                  enabled: false}
          })
            nodesarray.push({id:element.CATEGORY,
              events:{
                click:function(){
                console.log(element.CATEGORY); 
                localStorage.setItem('category',element.CATEGORY); 
                var color=colormap1['top'+i];
                localStorage.setItem('color',color);
                const self = this;
                this.chartCallback = chart => {
                  self.chart = chart;
                  debugger
                  this.onInitChart();
                };  
              },
            },
                name:element.CATEGORY+'<br/> Amount : '+element.AMOUNT,color:colormap1['top'+i]});
               if(count<=15){
              cat1.forEach(element1 => {

 if(element.CATEGORY==element1.CATEGORY){
  if(localStorage.getItem("category")==element.CATEGORY)
  {
    nodesarray.push({id:element1.BILLING_PLACE,name:element1.BILLING_PLACE+'<br/>'+element1.AMOUNT,color:colormap1['top'+i], marker: {
                  radius: 20
                 }

                 });
                 }
                 }
                 
          });i++;}count++;}
          
          );

          self.chartOptions.series = [
            {
             marker: {
                    radius: 30,
                   
                  },
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
                  nodes:nodesarray,
                  data: dataarray
              }
          ];
          self.updateFromInput = true;
          localStorage.removeItem("category");
          //  if(this.series.length>0)
          //  {
          //   debugger
          //   this.series[0].points.forEach(p => {
          //     p.graphic.hide();
          //     p.toNode.graphic.css({
          //       fillOpacity: 0
          //     });
          //     p.toNode.isHidden = true;
          //     p.toNode.dataLabel.css({
          //       fillOpacity: 0
          //     })
          //   })
          //   self.updateFromInput = true;
          //  }
        //}, 2000);
      });
    });
      
  }

  public bindChildNodes()
  {
console.log("clicked")
  }
  
//--------------------------------------leaflet map ------------------------------------------>


toggleDisplayDivIf()
{
  
  console.log(localStorage.getItem("category"))
  if(localStorage.getItem("category")!='undefined' && localStorage.getItem("category")!=null)
  {
    //this.onMapReady(this.map);
    this.initializeMapOptions();
    this.getmapsdata();
    this.onInitChart();
  }
  
  console.log(localStorage.getItem("category"))
}

 public categ:any;
 public maparray:any;
  
  lastLayer: any;
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private pservice:PersonaService,) {}

  
    getmapsdata(): void {
     this.message=this.pservice.readMessage();
     for(let details of this.message){
     this.id=details.CLIENT_ID;
     }

     var ToDate=localStorage.getItem('ToDate');
     var FromDate=localStorage.getItem('FromDate');
     this.pservice.categorytop5(this.id,FromDate,ToDate).subscribe((data:any) => {
      const cate = data.map(data => data.CATEGORY);
      this.categ=cate;
     
      console.log(this.categ);
      this.pservice.mapplot(this.id,FromDate,ToDate).subscribe((data:any) => {
      const lat = data.map(data => data.TRANS_LATITUDE);
      const lon = data.map(data => data.TRANS_LONGITUDE);
      const cat = data.map(data => data.CATEGORY);
      const amt = data.map(data => data.AMOUNT);
      const place = data.map(data => data.BILLING_PLACE);
     
      localStorage.setItem("categoryarray1", JSON.stringify(data));

      const colormap : Record<string, string> = {
        "top1": "green",
        "top2": "red", 
        "top3": "yellow",
        "top4": "orange",
        "top5": "grey",
        "default": "blue"};

        for (var j in this.map._layers) {
          
              try {
                  this.map.removeLayer(this.map._layers[j]);
              } catch (e) {
                  console.log("problem with " + e + this.map._layers[j]);
              }
          
      } 
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:'',
        maxZoom: 18
    }).addTo(this.map); 
      //this.map.addTo(this.mapOptions);

     for(var i=0;i<lat.length;i++)
     {

        if(localStorage.getItem("category")!=null && localStorage.getItem("category")!='undefined')
        {
          if(localStorage.getItem("category")==cat[i])
          {
            if(this.categ[0]==cat[i])
            {
              this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top1']);
            }
            else if(this.categ[1]==cat[i])
            {
              this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top2']);
            }
            else if(this.categ[2]==cat[i])
            {
              this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top3']);
            }
            else if(this.categ[3]==cat[i])
            {
              this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top4']);
            }
            else if(this.categ[4]==cat[i])
            {
              this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top5']);
            }
          }
        }
        else
        {
          if(this.categ[0]==cat[i])
          {
            this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top1']);
          }
          else if(this.categ[1]==cat[i])
          {
            this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top2']);
          }
          else if(this.categ[2]==cat[i])
          {
            this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top3']);
          }
          else if(this.categ[3]==cat[i])
          {
            this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top4']);
          }
          else if(this.categ[4]==cat[i])
          {
            this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['top5']);
          }
          else
          {
            this.addSampleMarker(lat[i],lon[i],cat[i],amt[i],place[i],colormap['default']);
          }
        }

     }
    
   }); 
   });
  }
     
  onMapReady(map: Map) {
    
    this.map=null;
    this.map = map;
    //this.addSampleMarker();
  }

  private initializeMapOptions() {
    
    this.mapOptions=null;
    this.mapOptions = {
      center: [DEFAULT_LATITUDE, DEFAULT_LONGITUDE],
      zoom: 2,
      maxBounds:[[-100,-200],[90,100]],
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: ' '
          })
      ],
    };
    
  
  }

  private RemoveMarkers(lat,lon,color)
  {
    var marker = new Marker([lat, lon])
    .setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'+color+'.png'
        //iconUrl: 'my-icon.png',
        //className: 'blink'
      }));
      marker.addTo(this.map);
      marker.onRemove(this.map);
  }

  private addSampleMarker(lat,lon,cat,amt,place,color) {
    
    var marker = new Marker([lat, lon])
    .setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'+color+'.png'
        //iconUrl: 'my-icon.png',
        //className: 'blink'
      }));
      
  //L.DomUtil.addClass(marker._icon, "blink");
  marker.addTo(this.map);
  marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
  marker.on('mouseover', function (e) {
         this.openPopup();
     });
     
     marker.on('mouseout', function (e) {
         this.closePopup();
     });
  this.map.getZoom();
  // if(localStorage.getItem("category")!=null && localStorage.getItem("category")!='undefined')
  // {
  //   if(cat!=localStorage.getItem("category"))
  //   {
  //     //marker.onRemove(this.map);
  //     marker.bindPopup("<b>Category:</b> "+cat+"<br><b>Amount spent:</b> "+amt+"<br><b>Place:</b> "+place+"<b>",{closeButton: false, offset: L.point(0, -20)});
  //     marker.on('mouseover', function (e) {
  //            this.openPopup();
  //        });
         
  //        marker.on('mouseout', function (e) {
  //            this.closePopup();
  //        });
  //   }
     
  // }
 
}

ngOnDestroy() {
  // if (this.mySubscription) {
  //   this.mySubscription.unsubscribe();
  // }
}
 
}