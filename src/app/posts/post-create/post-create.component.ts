import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
// import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  post!: Post;
  isLoading = false;
  // form!: FormGroup;
  // imagePreview!: string;
  private mode = 'create';
  private postId: any;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   title: new FormControl(null, { validators: [Validators.required] }),
    //   content: new FormControl(null, { validators: [Validators.required] })
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
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  // onImagePicked(event: Event) {
  //   const file: any = (event.target as HTMLInputElement).files![0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image')?.updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
