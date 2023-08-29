import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, map, of, switchMap, tap } from 'rxjs';

import { IPost } from '@app/shared/models';
import { IAppState, back } from '@app/shared/+state';

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
    private snackBar: MatSnackBar,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.post$ = this.activatedRoute.data.pipe(
      map(({ post }) => post),
      switchMap((post) => {
        if (post) {
          return of(post);
        }

        const snackRef = this.snackBar.open(
          'Post not found!',
          'Back',
          { duration: 4500, horizontalPosition: 'right' }
        );

        return snackRef.onAction().pipe(
          tap(() => this.store.dispatch(back()))
        );
      }),
    );
  }

}
