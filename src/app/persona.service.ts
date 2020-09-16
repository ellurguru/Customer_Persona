import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import{catchError} from 'rxjs/operators';
import { Demographics } from './demo';

const baseUrl = 'http://localhost:3000/api/dcp';
const baseUrl1 = 'http://localhost:3000/api/dcp/persona';
const baseUrl2 = 'http://localhost:3000/api/dcp/ids';
const baseUrl3 = 'http://localhost:3000/api/dcp/loc';
const baseUrl4 = 'http://localhost:3000/api/dcp/loc1';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }
  listall(): Observable<any> {
    return this.http.get(baseUrl2). pipe(
           map((data: Demographics[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
  }
  listbyid(id): Observable<any> {
    return this.http.get(`${baseUrl1}/${id}`);
  }
  getcid(): Observable<any> {
    return this.http.get(baseUrl2);
  }
  mapcategorycreditcard(): Observable<any> {
    return this.http.get(baseUrl3);
  }

   mapcategorycreditcard1(): Observable<any> {
    return this.http.get(baseUrl4);
  }

}