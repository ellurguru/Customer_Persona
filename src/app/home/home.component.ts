import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  dataArray: any;
  myControl = new FormControl();
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  filteredOptions4: Observable<string[]>;

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private pservice:PersonaService) {  }

  private subs = new Subscription();

  ngOnInit(): void 
  {
  this.subs.add(this.pservice.getcid().subscribe((data) => {
      const id = data.map(data => data.client_id);
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

onSubmit() {
    this.router.navigate(['/dashboard']);
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







}
