import { Component, OnInit, ChangeDetectionStrategy, HostBinding, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NEVER, map, switchMap, tap } from 'rxjs';

import { IAppState, back } from '@app/shared/+state';
import { requestUpdatePost } from '@app/feature-posts/+state';

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
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(({ post }) => post),
      switchMap((post) => {
        if (post) {
          this.postGroup.patchValue(post);

          return NEVER;
        }

        this.postGroup.disable();
        const snackRef = this.snackBar.open(
          'Post not found!',
          'Back',
          { duration: 4500, horizontalPosition: 'right' }
        );

        return snackRef.onAction().pipe(
          tap(() => this.store.dispatch(back()))
        );
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
