import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Mapmodel } from './mapmodel';

const url = 'http://localhost:3000/api/dcp/getmapdetails/';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  constructor(private http: HttpClient) { }

      getmapdetails(): Observable<any> {
        return this.http.get(url). pipe(
               map((data: Mapmodel[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            )
      }
  }

