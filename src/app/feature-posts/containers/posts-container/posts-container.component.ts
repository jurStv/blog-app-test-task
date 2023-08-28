import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '@app/shared/+state';
import { requestPosts } from '@app/feature-posts/+state';

@Component({
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsContainerComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(requestPosts());
  }
}

