import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, take, tap } from 'rxjs/operators';
import { isEmpty, not } from 'ramda';

import { IAppState } from '@app/shared/+state';
import { requestPosts, selectPostsFiltersSearchQuery, updateSearchQuery } from '@app/feature-posts/+state';

@Component({
  selector: 'app-posts-search-field-container',
  templateUrl: './posts-search-field-container.component.html',
  styleUrls: ['./posts-search-field-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'appPostsSearchField'
})
export class PostsSearchFieldContainerComponent implements OnInit {
  searchControl = new FormControl('');
  destroyRef = inject(DestroyRef);

  get isClearButtonShown() {
    return not(isEmpty(this.searchControl.value));
  }

  constructor(
    private readonly store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.store.pipe(
      takeUntilDestroyed(this.destroyRef),
      select(selectPostsFiltersSearchQuery),
      take(1),
      tap((query) => this.searchControl.setValue(query, { emitEvent: false })),
    ).subscribe();

    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((searchQuery) => this.store.dispatch(updateSearchQuery({ searchQuery }))),
    ).subscribe();
  }

  searchPosts() {
    this.store.dispatch(requestPosts());
  }

  clearSearchField() {
    this.searchControl.setValue('');

    this.searchPosts();
  }

}
