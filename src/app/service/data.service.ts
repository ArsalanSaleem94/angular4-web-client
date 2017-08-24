import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {

  constructor(private url: string, private http: Http) { }

  getAll(){
    return this.http.get(this.url);
  }

  create(resource){
    return this.http.post(this.url, JSON.stringify(resource))
      .catch(this.handleError);
  }

  patch(){
    return this.http.patch(this.url + "/1", JSON.stringify({isRead: true}))
    .catch(this.handleError);
  }

  delete(id){
    return this.http.delete(this.url + '/' + id)
      .catch(this.handleError)
  }

  private handleError(error: Response){
      if (error.status === 400){
        return Observable.throw(new BadInput(error.json()));
      }
      if(error.status === 404)
          return Observable.throw(new NotFoundError());
      return Observable.throw(new AppError(error));
  }
}
