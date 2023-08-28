import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';

import { TopProgressBarService } from '@app/shared/progress';
import { IPost } from '@app/shared/models';
import { IAppState } from '@app/shared/+state';
import { selectRoutedPost } from '@app/feature-posts/+state';
import * as operations from '@app/feature-posts/data-access';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {
  const progress: TopProgressBarService = inject(TopProgressBarService);
  const apollo: Apollo = inject(Apollo);
  const store: Store<IAppState> = inject(Store<IAppState>);
  progress.showTopProgressBar('postResolver');

  return store.select(selectRoutedPost).pipe(
    take(1),
    switchMap((post) => {
      if (post) {
        return of(post);
      }
      const id = route.paramMap.get('postId');

      return apollo.query<{ post: IPost }>({
        query: operations.getPost,
        variables: { id }
      }).pipe(
        take(1),
        map(({ data: { post } }) => post),
        catchError((err) => of(null))
      );
    }),
    tap(() => progress.hideTopProgressBar('postResolver'))
  );
}
