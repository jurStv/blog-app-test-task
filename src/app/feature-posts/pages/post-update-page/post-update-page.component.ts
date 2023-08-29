import { Component, OnInit, ChangeDetectionStrategy, HostBinding, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';

import { IAppState } from '@app/shared/+state';
import { requestUpdatePost, showPostNotFoundSnack } from '@app/feature-posts/+state';

@Component({
  templateUrl: './post-update-page.component.html',
  styleUrls: ['./post-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostUpdatePageComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;
  destroyRef = inject(DestroyRef);

  postGroup = this.fb.group({
    id: [null as string, Validators.required],
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
      tap((post) => {
        if (post) {
          this.postGroup.patchValue(post);
          return;
        }

        this.postGroup.disable();
        this.store.dispatch(showPostNotFoundSnack())
      }),
    ).subscribe();
  }

  savePost() {
    if (this.postGroup.invalid) {
      return;
    }

    const { id, ...input } = this.postGroup.getRawValue();
    this.store.dispatch(requestUpdatePost({ options: { id, input }, requiresNavigationToList: true }));
  }
}
