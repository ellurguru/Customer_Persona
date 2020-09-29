import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PersonaService } from '../persona.service';
import {Demographics} from "./../demo";
import { ResultModel } from './../result-model';
import {FormControl,FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public mess :any[] = [];
 public CategoryModel: ResultModel[];
public id:any;
public fromd:any;
public tod:any;
public from_date:any;
ToDate = new FormControl(new Date(localStorage.getItem('ToDate')));
FromDate = new FormControl(new Date(localStorage.getItem('FromDate')));

constructor(private pservice:PersonaService){ 
  }
  ngOnInit() {

      this.mess=this.pservice.readMessage();
      console.log("hey im here!!");
      console.log(this.mess);  
      for(let details of this.mess){
     this.id=details.client_id;
     
  
    
     }  
  }


    onSubmit() {
      debugger;
      localStorage.setItem("ToDate", this.ToDate.value.getFullYear() + "-" + this.ToDate.value.getMonth() + "-" + this.ToDate.value.getDate());
      localStorage.setItem("FromDate", this.FromDate.value.getFullYear() + "-" + this.FromDate.value.getMonth() + "-" + this.FromDate.value.getDate());
      window.location.reload();
  }}






















