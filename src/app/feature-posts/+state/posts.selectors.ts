import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
import { find, propEq } from 'ramda';

import { IPostsState, POSTS_FEATURE_KEY, selectRouter } from '@app/shared/+state';
import { createPaginatorSelectors } from '@app/shared/utils';
import { IPost } from '@app/shared/models';

export const selectPostsState = createFeatureSelector<IPostsState>(
  POSTS_FEATURE_KEY
);

export const selectPostsResults = createSelector(
  selectPostsState,
  (state: IPostsState) => state.results
)

export const selectPostsPaging = createSelector(
  selectPostsState,
  (state: IPostsState) => state.paging
)

export const {
  selectPageIndex: selectPostsPageIndex,
  selectPageSize: selectPostsPageSize,
  selectPageSizeOptions: selectPostsPageSizeOptions,
  selectTotalResults: selectPostsTotalResults
} = createPaginatorSelectors(selectPostsPaging);

export const selectPostsFilters = createSelector(
  selectPostsState,
  (state: IPostsState) => state.filters
)

export const selectPostsFiltersSearchQuery = createSelector(
  selectPostsFilters,
  (filters) => filters.searchQuery
)

export const selectPostsError = createSelector(
  selectPostsState,
  (state: IPostsState) => state.error
)

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state: IPostsState) => state.loading
)

export const {
  selectRouteParam,
  selectRouteData,
} = getRouterSelectors(selectRouter);

export const selectPostIdRouteParam = selectRouteParam('postId');
export const selectPostRouteData = createSelector(
  selectRouteData,
  (data): IPost => data.post,
);

export const selectRoutedPost = createSelector(
  selectPostsResults,
  selectPostIdRouteParam,
  (posts, postId) => find<IPost>(propEq(postId, 'id'), posts)
);
