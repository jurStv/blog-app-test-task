import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';

import { IAppState, go } from '@app/shared/+state';
import { IPost } from '@app/shared/models';
import { requestDeletePost, selectPostsResults } from '@app/feature-posts/+state';
import { SharedDialogService } from '@app/shared/services';

@Component({
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListPageComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;
  posts$: Observable<IPost[]>;
  displayedColumns = ['id', 'title', 'body', 'menu'];

  constructor(
    private store: Store<IAppState>,
    private dialogs: SharedDialogService,
  ) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(selectPostsResults);
  }

  viewPost(post: IPost) {
    this.store.dispatch(go({ to: ['posts', post.id] }))
  }

  editPost(post: IPost) {
    this.store.dispatch(go({ to: ['posts', post.id, 'edit'] }))
  }

  async deletePost(post: IPost) {
    const dialogRef = this.dialogs.openConfirmDialog({
      title: 'Delete Post',
      message: `Are you sure about deleting the post: "${post.title}"`
    });
    const isConfirmed = await firstValueFrom(dialogRef.afterClosed());

    if (isConfirmed) {
      this.store.dispatch(requestDeletePost({ id: post.id }));
    }
  }
}
