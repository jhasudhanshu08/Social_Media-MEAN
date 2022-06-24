import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
// import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { PostCreateComponent } from '../post-create/post-create.component';
import { ModuleEditComponent } from '../module-edit/module-edit.component';
// import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub!: Subscription
  // dialog: any;

  constructor(public postsService: PostsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postsService.getPOst();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  
  openDialog() {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      autoFocus: false,
      maxHeight: '70vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openDialoga() {
  //   const dialogRef = this.dialog.open(ModuleEditComponent);

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
    console.log("deleted")
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }


}
// function DialogAnimationsExampleDialog(DialogAnimationsExampleDialog: any, arg1: { width: string; enterAnimationDuration: string; exitAnimationDuration: string; }) {
//   throw new Error('Function not implemented.');
// }

// function DialogContentExampleDialog(DialogContentExampleDialog: any) {
//   throw new Error('Function not implemented.');
// }

