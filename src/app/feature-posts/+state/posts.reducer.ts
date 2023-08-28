import { createReducer, on } from '@ngrx/store';

import { createPaginatorAdapter, INITIAL_PAGING_CONFIG } from '@app/shared/utils';
import { IPostsState } from '@app/shared/+state';

import * as postsActions from './posts.actions';

export const initialPostsState: IPostsState = {
  results: [],
  selected: null,
  loading: false,
  error: null,
  paging: INITIAL_PAGING_CONFIG,
  filters: {
    searchQuery: ''
  },
};

export const postsPaginatorAdapter = createPaginatorAdapter();

export const postsReducer = createReducer(
  initialPostsState,
  on(postsActions.requestPosts, state => ({ ...state, loading: true, error: null })),
  on(postsActions.requestPostsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(postsActions.requestPostsSuccess, (state, { results }) => ({ ...state, results, loading: false, error: null })),
  on(postsActions.cancelRequestPosts, state => ({ ...state, loading: false, error: null })),
  on(postsActions.selectPost, (state, { selected }) => ({ ...state, selected })),
  on(postsActions.requestDeletePostSuccess, (state, { id }) => ({
    ...state,
    results: state.results.filter((post) => post.id !== id)
  })),
  on(postsActions.requestUpdatePostSuccess, (state, { data }) => ({
    ...state,
    results: state.results.map((post) => post.id !== data.id ? post : ({ ...post, ...data }))
  })),

   /* Paging */
  on(
    postsActions.nextPostPage,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.nextPage(state.paging) })
  ),
  on(
    postsActions.previousPostPage,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.previousPage(state.paging) })
  ),
  on(
    postsActions.toPostPage,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.toPage(action.pageIndex, state.paging) })
  ),
  on(
    postsActions.setPostPageSize,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.setPageSize(action.pageSize, state.paging) })
  ),
  on(
    postsActions.setPostPageSizeOptions,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.setPageSizeOptions(action.pageSizeOptions, state.paging) })
  ),
  on(
    postsActions.setPostPagingTotalResults,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.setTotalResults(action.totalResults, state.paging) })
  ),
  on(
    postsActions.resetSearchPostsPagingConfig,
    (state, action) => ({ ...state, paging: postsPaginatorAdapter.resetConfig() })
  ),
  on(
    postsActions.updateSearchQuery,
    (state, { searchQuery }) => ({ ...state, filters: { ...state.filters, searchQuery } })
  ),
);
