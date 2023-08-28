import { Component, OnInit, ChangeDetectionStrategy, HostBinding, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilKeyChanged, filter, map, tap } from 'rxjs';

import { IAppState } from '@app/shared/+state';
import { requestUpdatePost } from '@app/feature-posts/+state';
import { existing } from '@app/shared/utils';

@Component({
  templateUrl: './post-update-page.component.html',
  styleUrls: ['./post-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostUpdatePageComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;
  destroyRef = inject(DestroyRef);

  postGroup = this.fb.group({
    id: [null as number, Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(({ post }) => post),
      filter(existing),
      distinctUntilKeyChanged('id'),
      tap((post) => this.postGroup.patchValue(post))
    ).subscribe();
  }

  savePost() {
    if (this.postGroup.invalid) {
      return;
    }

    const { id, ...input } = this.postGroup.getRawValue();
    this.store.dispatch(requestUpdatePost({ options: { id: +id, input }, requiresNavigationToList: true }));
  }
}
