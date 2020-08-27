import {Injectable} from '@angular/core';
import {BaseApi} from '../core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IScheme} from '../models/scheme';

@Injectable()
export class SchemesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getSchemes({page, limit, q, sort, order}): Observable<{ total: number, schemes: IScheme[] }> {
    return this.get('schemes', {_page: page, _limit: limit, q, _sort: sort, _order: order})
      .pipe(
        map(response => ({
          total: response.headers.get('X-Total-Count'),
          schemes: response.body
        }))
      );
  }

  getScheme({id}): Observable<IScheme> {
    return this.get(`schemes/${id}`)
      .pipe(
        map(response => response.body)
      );
  }

  deleteScheme({id}): Observable<any> {
    return this.delete(`schemes/${id}`);
  }

  postScheme(scheme: IScheme): Observable<any> {
    return this.post(`schemes`, scheme);
  }


  patchScheme(id: number, scheme: IScheme): Observable<any> {
    return this.patch(`schemes/${id}`, scheme);
  }

}
