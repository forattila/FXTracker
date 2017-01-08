import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

  private defaultHeaders: Headers;

  constructor(private http: Http) {
    this.defaultHeaders = new Headers();
    this.defaultHeaders.append('Content-Type', 'application/json');
  }

  /**
   * send http get request to webapi url
   * @param url
   */
  public get(url: string): Observable<any> {
    let result = this.http.get(url, { headers: this.defaultHeaders })
      .map((res: Response) => {
        if (res.status === 204) {
          console.warn('204 No Content for request:' + res.url);
        }
        return res.status !== 204 ? res.json() : null;
      }).share();    
    return result;
  }
}
