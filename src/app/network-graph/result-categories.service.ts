import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ResultModel } from './result-model';

const url = 'http://localhost:3000/api/dcp/top5/Aug-97/';

@Injectable({
  providedIn: 'root'
})
export class ResultCategoriesService {

  public headers: Headers;
  public _getUrl: string = '/api/Values/GetResult';
  //Get
  constructor(private http: HttpClient) { }

  categorytop5(): Observable<any> {
        return this.http.get(url). pipe(
               map((data: ResultModel[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            )
      }
}
