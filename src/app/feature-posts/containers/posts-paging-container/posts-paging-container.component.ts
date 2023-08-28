import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { IPagingConfig } from '@app/shared/utils';
import { IAppState } from '@app/shared/+state';
import { selectPostsPaging, setPostPageSize, toPostPage } from '@app/feature-posts/+state';

@Component({
  selector: 'app-posts-paging-container',
  templateUrl: './posts-paging-container.component.html',
  styleUrls: ['./posts-paging-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'appPostsPaging'
})
export class PostsPagingContainerComponent implements OnInit {
  config: IPagingConfig;
  destroyRef = inject(DestroyRef);

  constructor(
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.pipe(
      select(selectPostsPaging),
      takeUntilDestroyed(this.destroyRef),
      tap((c) => this.config = c),
      tap(() => this.cd.detectChanges()),
    ).subscribe();
  }

  handlePageChange(pageEvent: PageEvent) {
    const toPage = pageEvent.pageIndex + 1;

    if (this.config.pageIndex !== pageEvent.pageIndex + 1) {
      this.store.dispatch(toPostPage({ pageIndex: toPage }));
    }
    if (this.config.pageSize !== pageEvent.pageSize) {
      this.store.dispatch(setPostPageSize({ pageSize: pageEvent.pageSize }));
    }
  }
}
