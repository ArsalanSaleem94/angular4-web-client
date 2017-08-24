import { NotFoundError } from './../common/not-found-error';
import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app-error';
import { PostService } from './../service/post.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit
{
  posts: any[];
  
  constructor(private service: PostService){
    
  }

  /*
    This implemenatation violates sepration 
    of concerns principle, 
    such a class is hard to maintain and hard to test.
  */

  create(input: HTMLInputElement){
    let post:any = {title: input.value};
    input.value = "";

    this.service.create(post)
      .subscribe(response => {
        post.id = response.json().id;
        this.posts.splice(0, 0, post)

        console.log(response);
      }, (error: AppError) => {
        if(error instanceof BadInput){
          // this.form.setErrors(error.json())
          alert("404");
        }
        else{
          throw error;
        }
    });
    
  }

  updatePost(post){
    this.service.patch()
      .subscribe(response => {
        console.log(response);
          });
  }

  deletePost(post){
    
    this.service.delete(345)
      .subscribe(response => {
          let index = this.posts.indexOf(post);
          console.log(index);
          this.posts.splice(index, 1);
      }, (error: AppError) => {

        if (error instanceof NotFoundError)
          alert('This post has already been deleted.')
        else{
          throw error;
        }
    })
  }

  ngOnInit(){
    // You can use this code as a page_load method
    //Do not call http calls on constructor, use ngOnInit
    this.service.getAll()
    .subscribe(response => {
      this.posts = response.json();
    }, error => {

      //These two lines are repeated, 
      // alert('An unexpected error occured.');
      // console.log(error);

      //^ Moved to App-error-handler.ts class
    });
  }
}
