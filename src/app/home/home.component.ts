import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PersonaService } from '../persona.service';
import {Demographics} from "./../demo";
import { FormControl } from '@angular/forms';
import { map, startWith,debounce} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { fromEvent, interval } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  options1: string[] = [];
  options2: string[] = [];
  options3: string[] = [];
  options4: string[] = [];
  options5: string[] = [];
  dataArray: any[] = [];
  myControl = new FormControl();
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  filteredOptions4: Observable<string[]>;
  filteredOptions5: Observable<string[]>;
  filteredOptions6: Observable<string[]>;

  posts:any[] = [];

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private pservice:PersonaService) {




  }

  private subs = new Subscription();


 

  ngOnInit(): void 
  {
 var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var day = d.getDate();
    localStorage.setItem("ToDate", year + "-" + month + "-" + day);
    localStorage.setItem("FromDate", year-20 + "-" + month + "-" + day);
this.subs.add(this.pservice.getcid1().subscribe((data) => {
      this.dataArray=data;
      console.log(this.dataArray);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
    this.filteredOptions5 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.filteredOptions6 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter5(value))
      );

  this.subs.add(this.pservice.getcid().subscribe((data) => {
      const id = data.map(data => data.client_id );
      const first = data.map(data => data.first);
      const last = data.map(data => data.last);
      const email = data.map(data => data.email);
      this.options1 = id;
      this.options2 = first;
      this.options3 = last;
      this.options4 = email;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
    this.filteredOptions1 = this.myControl.valueChanges
    .pipe(debounce(() => interval(500)),
      startWith(''),
      map(value => this._filter1(value))
    );
    this.filteredOptions2 = this.myControl.valueChanges
    .pipe(debounce(() => interval(500)),
      startWith(''),
      map(value => this._filter2(value))
    );
    this.filteredOptions3 = this.myControl.valueChanges
    .pipe(debounce(() => interval(500)),
      startWith(''),
      map(value => this._filter3(value))
    );
    this.filteredOptions4 = this.myControl.valueChanges
    .pipe(debounce(() => interval(500)),
      startWith(''),
      map(value => this._filter4(value))
    );
   
  }


private _filter5(value: any): any[] {
    const filterValue = value.toLowerCase();
    console.log("this.dataArray");
    console.log(this.dataArray);
    return this.dataArray.filter(option => option.first.toLowerCase().includes(filterValue));
  }

 private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    console.log("this.dataArray");
    console.log(this.dataArray);
    console.log("jhytgrfedws");
     console.log(this.dataArray.filter(option => option.client_id));
    return this.dataArray.filter(option => option.client_id.toLowerCase().includes(filterValue));
  }

    private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(options1 => options1.toLowerCase().includes(filterValue));
  }
   private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(options2 => options2.toLowerCase().includes(filterValue));
  }
   private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options3.filter(options3 => options3.toLowerCase().includes(filterValue));
  }
   private _filter4(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options4.filter(options4 => options4.toLowerCase().includes(filterValue));
  }
  
  ngOnDestroy() {
    if(this.subs) {
      this.subs.unsubscribe();
  }
  
}
onSubmit() {
const queryParams: any = {};
console.log(this.myControl.value);
var n1 = (this.options1).includes(this.myControl.value);
console.log(n1);
var n2 = (this.options2).includes(this.myControl.value);
console.log(n2);
var n3 = (this.options3).includes(this.myControl.value);
console.log(n3);
var n4 = (this.options4).includes(this.myControl.value);
console.log(n4);

if(n1){
    let url = 'http://localhost:3000/api/dcp/persona1';
    this.http.get(`${url}/${this.myControl.value}`).subscribe((posts:any) => {
        this.posts =posts;
        console.log(this.posts);
      this.pservice.setMessage(this.posts);
   
        this.router.navigate(['/dashboard',this.myControl.value]);
       
    });
}
else if(n2){
  
 let url = 'http://localhost:3000/api/dcp/persona2';
    this.http.get(`${url}/${this.myControl.value}`).subscribe((posts:any) => {
        this.posts =posts;
        console.log(this.posts);
         this.pservice.setMessage(this.posts);
        this.router.navigate(['/dashboard',this.myControl.value]);
       
    });

}else if(n3){
  
 let url = 'http://localhost:3000/api/dcp/persona3';
    this.http.get(`${url}/${this.myControl.value}`).subscribe((posts:any) => {
        this.posts =posts;
        console.log(this.posts);
         this.pservice.setMessage(this.posts);
        this.router.navigate(['/dashboard',this.myControl.value]);
       
    });
  
}else if(n4)
{
  let url = 'http://localhost:3000/api/dcp/persona4';
    this.http.get(`${url}/${this.myControl.value}`).subscribe((posts:any) => {
        this.posts =posts;
        console.log(this.posts);
         this.pservice.setMessage(this.posts);
        this.router.navigate(['/dashboard',this.myControl.value]);   
    });
}
else
{
  alert("Customer not found!");
}
    }  
      
}


 
   

    
   

  