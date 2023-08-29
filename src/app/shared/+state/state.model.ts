import { IPagingConfig } from '@app/shared/utils';
import { IPost } from '@app/shared/models';
import { RouterState } from '@ngrx/router-store';

export interface IAppState {
  [POSTS_FEATURE_KEY]: IPostsState;
  router: RouterState
}

export const POSTS_FEATURE_KEY = 'posts';
export interface IPostsState {
  results: IPost[];
  loading: boolean;
  error: any;
  paging: IPagingConfig;
  filters: {
    searchQuery: string;
  };
}
