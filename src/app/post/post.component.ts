import { PostService } from './../service/post.service';
import { Component, OnInit } from '@angular/core';

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

  createPost(input: HTMLInputElement){
    let post:any = {title: input.value};
    input.value = "";

    this.service.createPost(post)
      .subscribe(response => {
        post.id = response.json().id;
        this.posts.splice(0, 0, post)

        console.log(response);
      });
    
  }

  updatePost(post){
    this.service.patchPost()
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(post){
    
    this.service.deletePost(post)
      .subscribe(response => {
          let index = this.posts.indexOf(post);
          console.log(index);
          this.posts.splice(index, 1);
      })
  }

  ngOnInit(){
    // You can use this code as a page_load method
    //Do not call http calls on constructor, use ngOnInit
    this.service.getPosts()
    .subscribe(response => {
      this.posts = response.json();
    });
  }
}
