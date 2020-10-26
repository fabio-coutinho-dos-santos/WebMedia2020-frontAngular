import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http'
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private http: HttpClient){}

    public getLocation(lat:number, lng:number) : Observable<any>
    {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        }

        return this.http.get(
            //'http://10.0.0.10:3000/oapi/morador',
            'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyAm-53lvsxRxpelvvV9VB4LSOHFPaQp1H0',
        )
        .pipe(map((resp:any)=>resp))
    }
}
