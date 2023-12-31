import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, skip, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { not } from 'ramda';

import { batchActions, go, IAppState } from '@app/shared/+state';
import { PostsGqlService } from '@app/feature-posts/data-access';
import { TopProgressBarService } from '@app/shared/progress';

import * as actions from './posts.actions';
import * as selectors from './posts.selectors';

@Injectable()
export class PostsEffects {
  constructor(
    private apollo: Apollo,
    private action$: Actions,
    private store: Store<IAppState>,
    private snackBar: MatSnackBar,
    private progress: TopProgressBarService,
    private postsGql: PostsGqlService
  ) {}

  getPosts: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(actions.requestPosts),
      debounceTime(300),
      withLatestFrom(
        this.store.select(selectors.selectPostsPaging),
        this.store.select(selectors.selectPostsFilters),
      ),
      tap(() => this.progress.showTopProgressBar('PostsEffects.getPosts')),
      switchMap(([_, { pageSize, pageIndex }, { searchQuery }]) =>
        this.postsGql.getPosts(pageSize, pageIndex, searchQuery).pipe(
          map(({ posts: { data, meta } }) => batchActions({ actions: [
            actions.requestPostsSuccess({ results: data }),
            actions.setPostPagingTotalResults({ totalResults: meta.totalCount })
          ] })),
          catchError((error) => of(actions.requestPostsFailure({ error })))
        )
      ),
      tap(() => this.progress.hideTopProgressBar('PostsEffects.getPosts')),
    )
  );

  pagingChange$: Observable<Action> = createEffect(() =>
    merge(
      this.store.select(selectors.selectPostsPageIndex).pipe(
        distinctUntilChanged(),
        skip(1)
      ),
      this.store.select(selectors.selectPostsPageSize).pipe(
        distinctUntilChanged(),
        skip(1)
      )
    ).pipe(
      debounceTime(300),
      map(() => actions.requestPosts())
    ),
  );

  deletePost: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(actions.requestDeletePost),
      debounceTime(300),
      tap(() => this.progress.showTopProgressBar('PostsEffects.deletePost')),
      switchMap(({ id, notificationDisabled }) => {
        return this.postsGql.deletePost(id).pipe(
          tap(() => {
            if (not(notificationDisabled)) {
              this.snackBar.open(
                'The post was successfully deleted!',
                'Ok',
                { duration: 1500, horizontalPosition: 'right' }
              );
            }
          }),
          map(() => actions.requestDeletePostSuccess({ id })),
          catchError((error) => of(actions.requestDeletePostFailure({ id, error })))
        );
      }),
      tap(() => this.progress.hideTopProgressBar('PostsEffects.deletePost')),
    )
  );

  updatePost: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(actions.requestUpdatePost),
      debounceTime(300),
      tap(() => this.progress.showTopProgressBar('PostsEffects.updatePost')),
      switchMap(({ options, notificationDisabled, requiresNavigationToList }) => {
        return this.postsGql.updatePost(options).pipe(
          tap(() => {
            if (not(notificationDisabled)) {
              this.snackBar.open('Changes were successfully saved!', 'Ok', { duration: 1500, horizontalPosition: 'right' });
            }
          }),
          map(({ data }) => {
            if (not(requiresNavigationToList)) {
              return actions.requestUpdatePostSuccess({ data });
            }

            return batchActions({ actions: [
              actions.requestUpdatePostSuccess({ data }),
              go({ to: ['posts', 'list'] })
            ] });
          }),
          catchError((error) => of(actions.requestUpdatePostFailure({ id: options.id, error })))
        );
      }),
      tap(() => this.progress.hideTopProgressBar('PostsEffects.updatePost')),
    )
  );

  createPost: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(actions.requestCreatePost),
      debounceTime(300),
      tap(() => this.progress.showTopProgressBar('PostsEffects.createPost')),
      switchMap(({ options, notificationDisabled, requiresNavigationToList }) => {
        return this.postsGql.createPost(options).pipe(
          tap(() => {
            if (not(notificationDisabled)) {
              this.snackBar.open('New post was successfully created!', 'Ok', { duration: 1500, horizontalPosition: 'right' });
            }
          }),
          map(({ data }) => {
            if (not(requiresNavigationToList)) {
              return actions.requestCreatePostSuccess({ data });
            }

            return batchActions({ actions: [
              actions.requestCreatePostSuccess({ data }),
              go({ to: ['posts', 'list'] })
            ] });
          }),
          catchError((error) => of(actions.requestCreatePostFailure({ error })))
        );
      }),
      tap(() => this.progress.hideTopProgressBar('PostsEffects.createPost')),
    )
  );

  triggerRequestPosts: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(
        actions.requestCreatePostSuccess,
      ),
      map(() => actions.requestPosts())
    )
  );

  showPostNotFoundSnack: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(
        actions.showPostNotFoundSnack,
      ),
      switchMap(() => {
        const snackRef = this.snackBar.open(
          'Post not found!',
          'Posts',
          { duration: 4500, horizontalPosition: 'right' }
        );

        return snackRef.onAction().pipe(
          map(() => go({ to: ['posts', 'list'] }))
        );
      })
    )
  );
}
