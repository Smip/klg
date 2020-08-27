import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseApi {
  private baseUrl = environment.apiURL;

  constructor(public http: HttpClient) {
  }

  public get(url: string = '', data = {}): Observable<any> {
    const params = new HttpParams({
      fromObject: data,
    });
    return this.http.get(this.getUrl(url), {params: params, observe: 'response'});
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }

  public patch(url: string = '', data: any = {}): Observable<any> {
    return this.http.patch(this.getUrl(url), data);
  }

  public delete(url: string = ''): Observable<any> {
    return this.http.delete(this.getUrl(url));
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
}
