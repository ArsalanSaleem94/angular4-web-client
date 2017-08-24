import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class PostService {

  /*
    Handling Errors
    2 types of error:
      - Unexpected
      - Expected
  */
  private url = "https://jsonplaceholder.typicode.com/posts"

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(this.url);
  }

  createPost(post){
    return this.http.post(this.url, JSON.stringify(post))
      .catch(this.handleError);
  }

  patchPost(){
    return this.http.patch(this.url + "/1", JSON.stringify({isRead: true}))
    .catch(this.handleError);
  }

  deletePost(id){
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
