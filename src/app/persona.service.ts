import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import{catchError} from 'rxjs/operators';
import { Demographics } from './demo';
import { Mapmodel } from './mapmodel';
import { Subject } from 'rxjs/Subject';
import { ResultModel } from './result-model';

const baseUrl = 'http://localhost:3000/api/dcp';
const baseUrl1 = 'http://localhost:3000/api/dcp/persona';
const baseUrl2 = 'http://localhost:3000/api/dcp/ids';
const baseUrl3 = 'http://localhost:3000/api/dcp/loc';
const baseUrl4 = 'http://localhost:3000/api/dcp/loc1';
const baseUrl5 = 'http://localhost:3000/api/dcp/top5';
const baseUrl6 = 'http://localhost:3000/api/dcp/getmapdetails';
const baseUrl7 = 'http://localhost:3000/api/dcp/map';
const baseUrl8 = 'http://localhost:3000/api/dcp/top5date';
const baseUrl9 = 'http://localhost:3000/api/dcp/ids1';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
public message :any[] = [];
public message1 :any[] = [];

constructor(private http: HttpClient) { }

listall(): Observable<any> 
{
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
getcid1(): Observable<any> {
    return this.http.get(baseUrl9);
  }

 getmapdetails(): Observable<any> {
        return this.http.get(baseUrl6). pipe(
               map((data: Mapmodel[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            )
      }
 public setMessage(message):void {
     localStorage.setItem('this.message', JSON.stringify(message));
   }
   public readMessage():any {
   var retrievedObject =localStorage.getItem('this.message');
   this.message1=JSON.parse(retrievedObject);
       return this.message1;
   }

   categorytop5(id,FromDate,ToDate): Observable<any> {
    debugger;
      return this.http.get(`${baseUrl5}/${id}/${FromDate}/${ToDate}`). pipe(
             map((data: ResultModel[]) => {
               return data;
             }), catchError( error => {
               return throwError( 'Something went wrong!' );
             })
          )
    }
       mapplot(id,FromDate,ToDate): Observable<any> {
        return this.http.get(`${baseUrl7}/${id}/${FromDate}/${ToDate}`). pipe(
               map((data: ResultModel[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            )
      }
 saveStudent(student) {
    console.log(JSON.stringify(student));
  }
   categorytop5withdate(id): Observable<any> {
        return this.http.get(`${baseUrl8}/${id}`). pipe(
               map((data: ResultModel[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            )
      }
}




