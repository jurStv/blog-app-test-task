import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { not } from 'ramda';

import { IPost } from '@app/shared/models';
import { IAppState } from '@app/shared/+state';
import { showPostNotFoundSnack } from '@app/feature-posts/+state';

@Component({
  templateUrl: './post-view-page.component.html',
  styleUrls: ['./post-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewPageComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;
  post$: Observable<IPost>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.post$ = this.activatedRoute.data.pipe(
      map(({ post }) => post),
      tap((post) => {
        if (not(post)) {
          this.store.dispatch(showPostNotFoundSnack())
        }
      })
    );
  }

}
