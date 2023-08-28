import { ActionReducer, Action, createAction, createSelector, MemoizedSelector, props } from '@ngrx/store';
import { mergeDeepLeft, isEmpty, clamp, equals, max } from 'ramda';

import { PersistentStorageService } from '@app/shared/services';
import { pickNested } from './helpers';

export function storageMetaReducerFactory<S, A extends Action = Action>(saveKeys: string[], localStorageKey: string, storageService: PersistentStorageService) {
  let onInit = true;

  return function(reducer: ActionReducer<S, A>) {
    return function(state: S, action: A): S {
      const nextState = reducer(state, action);

      if (onInit) {
        onInit = false;
        const savedState = storageService.getItem(localStorageKey);

        return mergeDeepLeft(savedState, nextState as any) as any;
      }

      if (isEmpty(saveKeys)) {
        storageService.setItem(localStorageKey, nextState);
      } else {
        const stateToSave = pickNested(saveKeys, nextState);
        storageService.setItem(localStorageKey, stateToSave);
      }

      return nextState;
    };
  };
}

export const PAGE_SIZES = [
  10,
  25,
  50,
  100,
];

export const INITIAL_PAGING_CONFIG: IPagingConfig = {
  pageIndex: 1,
  pageSize: 25,
  pageSizeOptions: PAGE_SIZES,
  totalResults: 0,
};

export interface IPagingConfig {
  readonly totalResults: number;
  readonly pageSize: number;
  readonly pageIndex: number;
  readonly pageSizeOptions: number[];
}

export interface IBasePaginatorAdapter {
  previousPage: (config: IPagingConfig) => IPagingConfig;
  nextPage: (config: IPagingConfig) => IPagingConfig;
  toPage: (page: number, config: IPagingConfig) => IPagingConfig;
  setPageSize: (pageSize: number, config: IPagingConfig) => IPagingConfig;
  setPageSizeOptions: (pageSizeOptions: number[], config: IPagingConfig) => IPagingConfig;
  setTotalResults: (totalResults: number, config: IPagingConfig) => IPagingConfig;
  resetConfig: () => IPagingConfig;
}

export const createPaginatorAdapter = (config = INITIAL_PAGING_CONFIG): IBasePaginatorAdapter => {
  const getMaxPageIndex = (config: IPagingConfig): number => {
    return max(Math.ceil(config.totalResults / config.pageSize), 1);
  }

  return {
    nextPage: (config: IPagingConfig) => {
      const pageIndex = clamp(1, getMaxPageIndex(config), config.pageIndex + 1);

      if (equals(pageIndex, config.pageIndex)) {
        return config;
      }

      return { ...config, pageIndex };
    },
    previousPage: (config: IPagingConfig) => {
      const pageIndex = clamp(1, getMaxPageIndex(config), config.pageIndex - 1);

      if (equals(pageIndex, config.pageIndex)) {
        return config;
      }

      return { ...config, pageIndex };
    },
    toPage: (page: number, config: IPagingConfig) => {
      const pageIndex = clamp(1, getMaxPageIndex(config), page);

      if (equals(pageIndex, config.pageIndex)) {
        return config;
      }

      return { ...config, pageIndex };
    },
    setPageSize: (pageSize: number, config: IPagingConfig): IPagingConfig => ({
      ...config,
      pageSize
    }),
    setPageSizeOptions: (pageSizeOptions: number[], config: IPagingConfig): IPagingConfig=> ({
      ...config,
      pageSizeOptions
    }),
    setTotalResults: (totalResults: number, config: IPagingConfig): IPagingConfig => ({
      ...config,
      totalResults
    }),
    resetConfig: () => config,
  };
};

export const createPaginatorSelectors = (selector: MemoizedSelector<any, IPagingConfig, any>) => ({
  selectTotalResults: createSelector(
    selector,
    ({ totalResults }) => totalResults,
  ),
  selectPageSize: createSelector(
    selector,
    ({ pageSize }) => pageSize,
  ),
  selectPageIndex: createSelector(
    selector,
    ({ pageIndex }) => pageIndex,
  ),
  selectPageSizeOptions: createSelector(
    selector,
    ({ pageSizeOptions }) => pageSizeOptions,
  )
});

export const createPaginatorActions = (PREFIX: string) => ({
  nextPage: createAction(`${PREFIX} Paginator Next Page`),
  previousPage: createAction(`${PREFIX} Paginator Previous Page`),
  toPage: createAction(`${PREFIX} Paginator To Page`, props<{ pageIndex: number }>()),
  setPageSize: createAction(`${PREFIX} Paginator Set Page Size`, props<{ pageSize: number }>()),
  setPageSizeOptions: createAction(`${PREFIX} Paginator Set Page Size OPtions`, props<{ pageSizeOptions: number[] }>()),
  setTotalResults: createAction(`${PREFIX} Paginator Total Results`, props<{ totalResults: number }>()),
  resetConfig: createAction(`${PREFIX} Paginator Reset Config`)
});
