import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent implements OnInit, OnDestroy {

  // posts: Post[] = []
  // private postsSub!: Subscription
  // dialog: any;

  post!: Post;
  isLoading  = false;
  private mode = 'create';
  private postId: any;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.postsService.getPOst();
    // this.postsSub = this.postsService.getPostUpdateListener()
    // .subscribe((posts: Post[]) => {
    //   this.posts = posts;
    // });
  
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          // this.form.setValue({
          //   title: this.post.title,
          //   content: this.post.content,
          // });
        });
      } else {
        // this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    // if (this.mode === "create") {
    //   this.postsService.addPost(form.value.title, form.value.content);
    // } else {
      else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }

  // openDialoga() {
  //   const dialogRef = this.dialog.open(ModuleEditComponent);

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  ngOnDestroy(): void {
    // this.postsSub.unsubscribe();
  }
  

}
