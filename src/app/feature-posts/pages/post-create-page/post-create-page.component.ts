import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IAppState } from '@app/shared/+state';
import { requestCreatePost } from '@app/feature-posts/+state';

@Component({
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreatePageComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;

  postGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  savePost() {
    if (this.postGroup.invalid) {
      return;
    }

    const input = this.postGroup.getRawValue();
    this.store.dispatch(requestCreatePost({ options: { input }, requiresNavigationToList: true }));
  }
}
