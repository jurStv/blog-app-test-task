import { createAction, props } from '@ngrx/store';

import { IPost } from '@app/shared/models';
import { createPaginatorActions } from '@app/shared/utils';
import { IRequestCreatePostOptions, IRequestUpdatePostOptions, IResponsePost } from '../models';

export const requestPosts = createAction(
  '[Posts] Request Posts',
);

export const requestPostsSuccess = createAction(
  '[Posts] Request Posts Success',
  props<{ results: IPost[]; }>()
);

export const requestPostsFailure = createAction(
  '[Posts] Request Posts Failure',
  props<{ error: any; }>()
);

export const {
  nextPage: nextPostPage,
  previousPage: previousPostPage,
  resetConfig: resetPostPage,
  setPageSize: setPostPageSize,
  setPageSizeOptions: setPostPageSizeOptions,
  setTotalResults: setPostPagingTotalResults,
  toPage: toPostPage
} = createPaginatorActions('[Posts] Posts');

export const resetSearchPostsPagingConfig = createAction(
  '[Posts] Reset Posts Paging Config',
);

export const updateSearchQuery = createAction(
  '[Posts] Update Search Query',
  props<{ searchQuery: string; }>()
);

export const requestDeletePost = createAction(
  '[Posts] Request Delete Post',
  props<{ id: string; notificationDisabled?: boolean; }>()
);

export const requestDeletePostSuccess = createAction(
  '[Posts] Request Delete Post Success',
  props<{ id: string; }>()
);

export const requestDeletePostFailure = createAction(
  '[Posts] Request Delete Post Failure',
  props<{ id: string; error: any; }>()
);

export const requestUpdatePost = createAction(
  '[Posts] Request Update Post',
  props<{
    options: IRequestUpdatePostOptions;
    notificationDisabled?: boolean;
    requiresNavigationToList?: boolean;
  }>()
);

export const requestUpdatePostSuccess = createAction(
  '[Posts] Request Update Post Success',
  props<{ data: IResponsePost; }>()
);

export const requestUpdatePostFailure = createAction(
  '[Posts] Request Update Post Failure',
  props<{ id: string; error: any; }>()
);

export const requestCreatePost = createAction(
  '[Posts] Request Create Post',
  props<{
    options: IRequestCreatePostOptions;
    notificationDisabled?: boolean;
    requiresNavigationToList?: boolean;
  }>()
);

export const requestCreatePostSuccess = createAction(
  '[Posts] Request Create Post Success',
  props<{ data: IResponsePost; }>()
);

export const requestCreatePostFailure = createAction(
  '[Posts] Request Create Post Failure',
  props<{ error: any; }>()
);
