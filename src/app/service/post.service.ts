import { Injectable } from '@angular/core';
import { Http } from "@angular/http";


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
    return this.http.post(this.url, JSON.stringify(post));
  }

  patchPost(){
    return this.http.patch(this.url + "/1", JSON.stringify({isRead: true}));
  }

  deletePost(post){
    return this.http.delete(this.url + '/' + post.id);
  }
}
